import styled from "styled-components";

const DeletePromptWrapper = styled.div``;

const DeletePromptHeading = styled.h3`
  color: ${({ theme }) => theme.colors.alertText};
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const TaskButton = styled.button`
  border: none;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.buttons.destructiveBg};
  color: ${({ theme }) => theme.colors.buttons.primaryText};
  width: 100%;
  padding: 10px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    max-width: 200px;
  }
`;

const DeleteButton = styled(TaskButton)`
  background: ${({ theme }) => theme.colors.buttons.destructiveBg};
  color: ${({ theme }) => theme.colors.buttons.primaryText};
`;

const CancelButton = styled(TaskButton)`
  background: ${({ theme }) => theme.colors.buttons.secondaryBg};
  color: ${({ theme }) => theme.colors.buttons.secondaryText};
`;

const DeletePrompt = ({ onDelete, cancelDelete, title, type }) => {
  return (
    <DeletePromptWrapper>
      <DeletePromptHeading>
        Delete this {type === "board" ? "board" : "task"}?
      </DeletePromptHeading>
      <Paragraph>
        {type === "board"
          ? `Are you sure you want to delete the ‘${title}’ board? This action will remove all columns and tasks and cannot be reversed.`
          : `Are you sure you want to delete the ‘${title}’ task and its subtasks?
        This action cannot be reversed.`}
      </Paragraph>
      <FlexWrapper>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        <CancelButton onClick={cancelDelete}>Cancel</CancelButton>
      </FlexWrapper>
    </DeletePromptWrapper>
  );
};

export default DeletePrompt;
