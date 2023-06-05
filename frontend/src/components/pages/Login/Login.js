import { useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  TextBox,
  Label,
  SubmitButton,
  ErrorBox,
} from "../Signup/Signup.styled";

import { ReactComponent as LeftArrowIcon } from "../../../assets/arrow-left-solid.svg";

import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Container>
      <button className="back-btn" onClick={() => navigate("/")}>
        <LeftArrowIcon />
      </button>
      <h1>Login</h1>

      <Form onSubmit={submitForm}>
        {error && <ErrorBox>{error}</ErrorBox>}
        <InputGroup>
          <Label>Email</Label>
          <TextBox
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <TextBox
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          Submit
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Login;
