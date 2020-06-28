import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import QueryCallbackWrapper from '../helpers/react-apollo';

let infoKey = 0;

const ME_QUERY = gql`
  {
    me {
      id
      name
      email
      phone_number
    }
  }
`;

const useStyles = makeStyles({
  root: {
    paddingBottom: 24,
    backgroundColor: 'rgb(129, 187, 217)',
    height: '100%',
    minHeight: '100vh',
  },
});

const InfoComponent = ({ data }) => {
  const classes = useStyles();
  const infos = (data && data.allInfo) || [];

  return (
    <Box className={classes.root}>
      <Header crumbText={'Public Info'} />
      <Container maxWidth="md">
      INFO
      </Container>
    </Box>
  );
};

const Info = () => {
  return <Query query={ME_QUERY}>{QueryCallbackWrapper({ Component: InfoComponent })}</Query>;
};

export default withRouter(Info);
