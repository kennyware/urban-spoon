import styled, { keyframes } from "styled-components";
import { ReactComponent as GearIcon } from "../assets/gear-solid.svg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;

  .loader-icon {
    animation: ${rotate} 2s linear infinite;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }
`;

const Spinner = () => {
  return (
    <StyledSpinner>
      <GearIcon className="loader-icon" />
      <p>Loading</p>
    </StyledSpinner>
  );
};

export default Spinner;
