import { useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  TextBox,
  Label,
  SubmitButton,
  ErrorBox,
} from "./Signup.styled";
import { ReactComponent as LeftArrowIcon } from "../../../assets/arrow-left-solid.svg";
import { useNavigate } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, isLoading, error } = useSignup();

  const submitForm = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <Container>
      <button className="back-btn" onClick={() => navigate("/")}>
        <LeftArrowIcon />
      </button>
      <h1>Sign up</h1>
      <Form onSubmit={submitForm}>
        {error && <ErrorBox>{error}</ErrorBox>}
        <InputGroup>
          <Label>Username</Label>
          <TextBox
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
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

export default Signup;
