import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cards.bg};
  min-height: 88px;
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.1);
  border-radius: 10px;
  cursor: pointer;

  :not(&:first-of-type) {
    margin-top: 20px;
  }

  :hover {
    h5 {
      color: ${({ theme }) => theme.colors.cards.hover};
    }
  }

  h5 {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  p {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12px;
    font-weight: 700;
  }
`;

const Card = ({ task, onClick }) => {
  const subtasks = () => {
    const completeTasks = task.subtasks.filter((item) => {
      if (item.isCompleted) return true;
      return false;
    }).length;
    return completeTasks + " of " + task.subtasks.length + " subtasks";
  };

  const click = () => {
    onClick(task);
  };

  return (
    <StyledCard onClick={click}>
      <h5>{task.title}</h5>
      <p>{subtasks()}</p>
    </StyledCard>
  );
};

export default Card;
