import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const FullScreenCenteredContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorPage = () => {
  return (
    <FullScreenCenteredContainer>
      <Typography variant="h5" component="h2">
        This page could not be found
      </Typography>
    </FullScreenCenteredContainer>
  );
};

export default ErrorPage;
