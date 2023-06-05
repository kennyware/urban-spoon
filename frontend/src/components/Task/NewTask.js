import { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import { ReactComponent as CrossIcon } from "../../assets/icon-cross.svg";
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledDestructiveButton,
} from "../Button.styled";
import StatusSelectorDropdown from "./StatusSelectorDropdown";
import {
  StyledPopup,
  PopupForm,
  PopupFormGroup,
  PopupHeading,
  PopupInput,
  PopupLabel,
  PopupTextArea,
  PopupFormControl,
} from "../styles/Popup.styled";
import { useTasks } from "../hooks/useTasks";

const DeleteSubtaskButton = styled.button`
  border: none;
  background: none;
  outline: 0;
  color: ${({ theme }) => theme.colors.secondaryText};
  cursor: pointer;
  transtion: all 0.05s ease;

  width: 20px;
  height: 20px;

  :hover {
    color: ${({ theme }) => theme.colors.buttons.destructiveText};
  }
`;

const NewTask = forwardRef(({ editing, taskData }, ref) => {
  const initialState = {
    title: "",
    description: "",
    status: "Todo",
    subtasks: [],
  };

  const { addTask, editTask } = useTasks();
  const [changed, setChanged] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (formData.title && formData.subtasks.length > 0) {
      if (formData.subtasks.every((s) => s.title)) {
        if (changed) setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [formData, changed]);

  const handleSubmit = (e, close) => {
    e.preventDefault();

    if (disabled) {
      return false;
    }

    if (formData.subtasks.length > 0) {
      formData.subtasks.forEach((subtask) => {
        if (!subtask.title) {
          // Need to replace with toast alert
          console.log("empty title");
          return false;
        }
      });
    } else {
      // Need to replace with toast alert
      console.log("no subtasks");
      return false;
    }

    if (editing) {
      if (changed) editTask(taskData._id, formData);
    } else {
      addTask(formData);
    }

    setChanged(false);
    close();
  };

  const handleChange = (e) => {
    setChanged(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTitleChange = (e) => {
    setChanged(true);
    const index = +e.target.getAttribute("data-subtaskid");
    setFormData({
      ...formData,
      subtasks: formData.subtasks.map((s, i) =>
        i === index ? { ...formData.subtasks[i], title: e.target.value } : s
      ),
    });
  };

  const addSubtask = () => {
    setChanged(true);
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "", isCompleted: false }],
    });
  };

  const removeSubtask = (index) => {
    setChanged(true);
    setFormData({
      ...formData,
      subtasks: formData.subtasks.filter((s, i) => i !== index),
    });
  };

  const resetState = () => {
    setChanged(false);
    if (changed) {
      setFormData(initialState);
    }
  };

  const handleOnOpen = () => {
    if (taskData) {
      const { title, description, status, subtasks } = taskData;
      setFormData({ title, description, status, subtasks });
    }
  };

  return (
    <StyledPopup ref={ref} onOpen={handleOnOpen} onClose={resetState} nested>
      {(close) => (
        <PopupForm onSubmit={(e) => handleSubmit(e, close)}>
          <PopupHeading>{editing ? "Edit Task" : "Add New Task"}</PopupHeading>
          <PopupFormGroup>
            <PopupLabel htmlFor="title">Title</PopupLabel>
            <PopupInput
              type="text"
              placeholder="e.g Take cofee break"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
          </PopupFormGroup>
          <PopupFormGroup>
            <PopupLabel htmlFor="description">Description</PopupLabel>
            <PopupTextArea
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </PopupFormGroup>
          <PopupFormGroup>
            <PopupLabel htmlFor="">Subtasks</PopupLabel>
            {formData.subtasks.map((subtask, i) => (
              <PopupFormControl key={i}>
                <PopupInput
                  type="text"
                  placeholder="e.g. Drink coffee & smile"
                  name="title"
                  onChange={handleTitleChange}
                  data-subtaskid={i}
                  value={subtask.title}
                />
                <DeleteSubtaskButton
                  onClick={() => removeSubtask(i)}
                  type="button"
                >
                  <CrossIcon />
                </DeleteSubtaskButton>
              </PopupFormControl>
            ))}

            <StyledSecondaryButton
              type="button"
              onClick={addSubtask}
              className="fullWidth-btn"
            >
              +Add New Subtask
            </StyledSecondaryButton>
          </PopupFormGroup>
          <PopupFormGroup className="form-group" id="form-status">
            <PopupLabel htmlFor="status">Status</PopupLabel>
            <StatusSelectorDropdown
              currentStatus={formData.status}
              statusChange={(status) =>
                setFormData((data) => ({ ...data, status }))
              }
            />
          </PopupFormGroup>
          <StyledPrimaryButton
            type="submit"
            marginBottom="10px"
            className="fullWidth-btn"
            $disabled={disabled}
          >
            {editing ? "Save Changes" : "Create Task"}
          </StyledPrimaryButton>
          <StyledDestructiveButton
            type="button"
            onClick={close}
            className="fullWidth-btn"
          >
            Cancel
          </StyledDestructiveButton>
        </PopupForm>
      )}
    </StyledPopup>
  );
});

export default NewTask;
