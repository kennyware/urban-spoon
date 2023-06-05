import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledErrorPage = styled.div`
  width: 100%;
  height: 100vh;
  background: #e4ebfa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 20px;
  }

  .error {
    color: #ea5555;
  }
`;

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <StyledErrorPage>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="error">
        <i>{error.statusText || error.message}</i>
      </p>
    </StyledErrorPage>
  );
};

export default ErrorPage;
