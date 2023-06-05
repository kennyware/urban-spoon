import { useState } from "react";
import styled, { css } from "styled-components";

// Props: checked, title
const StyledSubtask = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.body};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: 700;
  padding: 15px 10px;
  cursor: pointer;

  &:hover {
    background-color: #635fc740;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  label {
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  span {
    ${({ checked }) =>
      checked &&
      css`
        opacity: 0.5;
        text-decoration: line-through;
      `};
  }
`;

const Subtask = ({ data, subtaskChange }) => {
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);

  const checkChange = (e) => {
    subtaskChange(e.target.checked);
    setIsCompleted(e.target.checked);
  };

  return (
    <StyledSubtask checked={isCompleted}>
      <input
        type="checkbox"
        defaultChecked={isCompleted}
        name="taskBox"
        onChange={checkChange}
      />
      <span>{data.title}</span>
    </StyledSubtask>
  );
};

export default Subtask;
