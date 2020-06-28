import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import styled from 'styled-components';

const FullScreenCenteredContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <FullScreenCenteredContainer>
      <BounceLoader size={150} color={'rgb(129, 187, 217)'} loading={true} />
    </FullScreenCenteredContainer>
  );
};

export default Loading;
