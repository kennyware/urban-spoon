import { useState, useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const { signup, isLoading, error } = useSignup();

  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
  }, [error]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrorText("Passwords do not match.");
      return;
    }

    await signup(email, password);
  };

  return (
    <Container>
      <button className="back-btn" onClick={() => navigate("/")}>
        <LeftArrowIcon />
      </button>
      <h1>Sign up</h1>
      <Form onSubmit={submitForm}>
        {errorText && <ErrorBox>{errorText}</ErrorBox>}
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
        <InputGroup>
          <Label>Confirm Password</Label>
          <TextBox
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </InputGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          Submit
        </SubmitButton>
      </Form>
      <p>
        Already have an account? <Link to={"/login"}>Log in here.</Link>
      </p>
    </Container>
  );
};

export default Signup;
