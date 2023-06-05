import { useState, useEffect, forwardRef } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import { StyledPrimaryButton, StyledDestructiveButton } from "../Button.styled";
import { useTasks } from "../hooks/useTasks";
import { useTasksContext } from "../context/TasksContext";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.4);
  }

  &-content {
    background: #fff;
    background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
    padding: 30px 20px;
    border-radius: 6px;
    max-height: 600px;
    width: 345px;
    overflow-y: auto;
  }
`;

const StyledTaskForm = styled.form`
  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    color: ${({ theme }) => theme.colors.cards.secondaryText};
    margin-bottom: 5px;
    font-weight: 700;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #828fa340;
    border-radius: 4px;
    background: transparent;
    color: ${({ theme }) => theme.colors.primaryText};
    outline: none;

    &::placeholder {
      opacity: 40%;
    }

    :focus {
      border-color: ${({ theme }) => theme.colors.cards.hover};
    }
  }

  textarea {
    min-height: 100px;
  }

  #form-subtasks {
    .form-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      input {
        width: 85%;
      }
    }
  }

  .fullWidth-btn {
    width: 100%;
  }
`;

const Heading = styled.h3`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.cards.primaryText};
`;

const BoardFormPopup = forwardRef(({ editing, closeMenu }, ref) => {
  const [name, setName] = useState("");
  const { board } = useTasksContext();
  const { addBoard } = useTasks();

  useEffect(() => {
    if (editing) {
      setName(board.name);
    }
  }, [editing, board]);

  const closeModal = () => {
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
    } else {
      addBoard(name);
    }
    closeModal();
    closeMenu();
  };

  const handleClick = (close) => {
    close();
  };

  return (
    <StyledPopup ref={ref} onClose={closeModal}>
      {(close) => (
        <StyledTaskForm onSubmit={handleSubmit}>
          <Heading>{editing ? "Edit Board" : "Add New Board"}</Heading>
          <div className="form-group" id="form-title">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              placeholder="Type a name for your board."
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <StyledPrimaryButton
            type="submit"
            marginBottom="10px"
            className="fullWidth-btn"
          >
            {editing ? "Edit Board" : "Create New Board"}
          </StyledPrimaryButton>
          <StyledDestructiveButton
            type="button"
            className="fullWidth-btn"
            onClick={() => handleClick(close)}
          >
            Cancel
          </StyledDestructiveButton>
        </StyledTaskForm>
      )}
    </StyledPopup>
  );
});

export default BoardFormPopup;
