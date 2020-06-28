import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const FullScreenCenteredContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound = () => {
  return (
    <FullScreenCenteredContainer>
      <Card variant="outlined" />
    </FullScreenCenteredContainer>
  );
};

export default NotFound;
