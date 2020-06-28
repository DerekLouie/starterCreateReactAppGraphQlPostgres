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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import { saveTokens } from '../helpers/manageTokens';
import { useAppContext } from '../components/AppContextProvider';
import { getApolloErrorMessage } from '../helpers/react-apollo';

const LOGIN = gql`
  mutation login($login_credential: String!, $password: String!) {
    login(login_credential: $login_credential, password: $password) {
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

const Login = ({ location = {} }) => {
  const classes = useStyles();
  const [usePhoneNumber, setUsePhoneNumber] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUser } = useAppContext();
  const [errorText, setErrorText] = useState();

  const [values, setValues] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [login, { data, }] = useMutation(LOGIN);

  const phoneNumberOnChange = (val) => {
    setValues({ ...values, phoneNumber: val });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!values.password || !values.email) {
      return;
    }

    try {
      await login({
        variables: {
          password: values.password,
          login_credential: values.email || values.phone_number,
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
    const tokens = get(data, 'login.tokens');
    const user = get(data, 'login');
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
            {!usePhoneNumber && <EmailInput value={values.email} onChange={handleChange('email')} />}
            {usePhoneNumber && <PhoneNumberInput value={values.phoneNumber} onChange={phoneNumberOnChange} />}
            <PasswordInput value={values.password} onChange={handleChange('password')} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={usePhoneNumber}
                  color="primary"
                  onChange={(e) => setUsePhoneNumber(e.currentTarget.checked)}
                  name="usePhoneNumber"
                />
              }
              label="Login with your phone number"
            />
            <FullWidthButton
              type="submit"
              size="small"
              color="primary"
              className={classes.fullWidth}
              onClick={(e) => handleLogin(e)}>
              Login
            </FullWidthButton>
          </FlexForm>
          <ReactRouterNavLink to="/signup">
            <FullWidthButton size="small" color="primary">
              Signup
            </FullWidthButton>
          </ReactRouterNavLink>
        </CenteredCard>
      </MaterialCenteredGrid>
      {errorText && <ErrorSnackBar message={errorText} />}
    </Box>
  );
};

export default withRouter(Login);
