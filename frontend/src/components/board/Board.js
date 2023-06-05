import { useEffect, useRef, useState } from "react";
import { StyledBoard, ColumnWrapper } from "./Board.styled";
import { StyledPrimaryButton } from "../Button.styled";
import { StyledContainer } from "../styles/Container.styled";
import Column from "../column/Column";
import { useTasksContext, sortTasksByStatus } from "../context/TasksContext";
import NewTask from "../Task/NewTask";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../Spinner";

const Board = () => {
  const { board, tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const columns = ["Todo", "Doing", "Done"];
  const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/boards/${board._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        console.log(json.error);
      }

      if (response.ok) {
        dispatch({ type: "GET_TASKS", tasks: json.tasks });
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user, board]);

  const handleClick = () => {
    ref.current.open();
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <StyledBoard>
      <StyledContainer>
        <ColumnWrapper>
          {tasks.length < 1 ? (
            <>
              <div className="empty-board-prompt">
                <p>This board is empty. Create a new task to get started.</p>
                <StyledPrimaryButton onClick={handleClick}>
                  + Add New task
                </StyledPrimaryButton>
              </div>

              {/* Add Task Popup */}
              <NewTask ref={ref} />
            </>
          ) : (
            columns.map((column, i) => (
              <Column
                key={column}
                name={column}
                tasks={sortTasksByStatus(column, tasks)}
                headingDotColor={columnColors[i]}
              />
            ))
          )}
        </ColumnWrapper>
      </StyledContainer>
    </StyledBoard>
  );
};

export default Board;
