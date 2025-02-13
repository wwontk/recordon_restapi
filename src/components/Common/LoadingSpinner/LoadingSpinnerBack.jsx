import styled, { keyframes } from "styled-components";

const LoadingSpinnerBack = () => {
  return (
    <>
      <LoadingSpinnerBackground>
        <Spinner />
      </LoadingSpinnerBackground>
    </>
  );
};

export default LoadingSpinnerBack;

const LoadingSpinnerBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
