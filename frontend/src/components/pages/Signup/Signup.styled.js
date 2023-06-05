import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .back-btn {
    border: none;
    background: none;
    width: 25px;
    position: absolute;
    left: 50px;
    top: 40px;
    cursor: pointer;
  }
`;

export const Form = styled.form`
  width: 400px;
  margin-top: 40px;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  width: 80px;
`;

export const TextBox = styled.input`
  margin-left: 10px;
  height: 30px;
  padding: 5px;
  width: 180px;
`;

export const SubmitButton = styled.button.attrs({ type: "submit" })`
  display: block;
  width: 80px;
  height: 30px;
  margin: auto;
  margin-top: 40px;
  cursor: pointer;
`;

export const ErrorBox = styled.div`
  width: 100%;
  padding: 10px 10px;
  background: rgba(234, 85, 85, 0.4);
  border: 1px solid #000;
  margin-bottom: 20px;
`;
