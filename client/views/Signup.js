import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import ErrorSnackBar from '../components/ErrorSnackBar';
import Box from '@material-ui/core/Box';
import MaterialCenteredGrid from '../components/MaterialCenteredGrid';
import ReactRouterNavLink from '../components/ReactRouterNavLink';
import CenteredCard from '../components/CenteredCard';
import FlexForm from '../components/FlexForm';
import Logo from '../components/Logo';
import EmailInput from '../components/form/EmailInput';
import PasswordInput from '../components/form/PasswordInput';
import PhoneNumberInput from '../components/form/PhoneNumberInput';
import FullWidthButton from '../components/FullWidthButton';
import Input from '@material-ui/core/Input';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import { saveTokens } from '../helpers/manageTokens';
import { useAppContext } from '../components/AppContextProvider';
import { getApolloErrorMessage } from '../helpers/react-apollo';

const SIGNUP = gql`
  mutation signup($phone_number: String!, $email: String!, $name: String!, $password: String!) {
    signup(phone_number: $phone_number, name: $name, email: $email, password: $password) {
      id
      name
      email
      phone_number
      tokens {
        accessToken
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  margin: {
    marginBottom: '1rem',
  },
}));

const Signup = ({ location = {} }) => {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAppContext();
  const [errorText, setErrorText] = useState();

  const [values, setValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [signup, { data }] = useMutation(SIGNUP);

  const phoneNumberOnChange = (val) => {
    setValues({ ...values, phoneNumber: val });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!values.password || !values.email) {
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrorText('Password values do not match');
      return;
    }

    try {
      await signup({
        variables: {
          password: values.password,
          email: values.email,
          name: values.name,
          phone_number: values.phoneNumber,
        },
      });
    } catch (error) {
      setErrorText(getApolloErrorMessage(error));
    }
  };

  if (isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  }

  if (data) {
    const tokens = get(data, 'signup.tokens');
    const user = get(data, 'signup');
    saveTokens(tokens);
    setIsAuthenticated(true);
    setUser(user);
  }

  return (
    <Box>
      <Header />
      <MaterialCenteredGrid container className={classes.root}>
        <CenteredCard>
          <Logo src="https://www.pngkey.com/png/detail/141-1416946_logos-what-is-a-generic-logo-transparent-background.png" />
          <FlexForm>
            <EmailInput value={values.email} onChange={handleChange('email')} />
            <PhoneNumberInput value={values.phoneNumber} onChange={phoneNumberOnChange} />
            <Input
              type="name"
              value={values.name}
              onChange={handleChange('name')}
              className={classes.margin}
              placeholder="Name"
            />
            <PasswordInput value={values.password} onChange={handleChange('password')} />
            <PasswordInput label="Confirm Password" value={values.confirmPassword} onChange={handleChange('confirmPassword')} />
            <FullWidthButton
              type="submit"
              size="small"
              color="primary"
              className={classes.fullWidth}
              onClick={(e) => handleSignup(e)}>
              Signup
            </FullWidthButton>
          </FlexForm>
          <ReactRouterNavLink to="/login">
            <FullWidthButton size="small" color="primary">
              Already have an account?
            </FullWidthButton>
          </ReactRouterNavLink>
        </CenteredCard>
      </MaterialCenteredGrid>
      {errorText && <ErrorSnackBar message={errorText} />}
    </Box>
  );
};

export default withRouter(Signup);
