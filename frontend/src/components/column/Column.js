import { useState } from "react";
import {
  StyledStatusIndicator,
  StyledColumn,
  StyledHeading,
  TaskListContainer,
} from "./Column.styled";
import Card from "../Card";
import ViewTask from "../Task/ViewTask";
import { useTasksContext } from "../context/TasksContext";

const Column = ({ name, tasks, headingDotColor }) => {
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { dispatch } = useTasksContext();

  const selectTask = (taskData) => () => {
    setOpen((o) => !o);
    setCurrentTask(taskData);
  };

  const closeModal = () => setOpen(false);

  const updateTaskStatus = (task, index, status) => {
    const tempObj = task;

    if (index != null) {
      tempObj.subtasks[index].isCompleted = status;
      const completedSubtasks = tempObj.subtasks.filter(
        (item) => item.isCompleted === true
      );

      if (completedSubtasks.length === 0) {
        tempObj.status = "Todo";
      } else {
        if (completedSubtasks.length === tempObj.subtasks.length) {
          tempObj.status = "Done";
        } else {
          tempObj.status = "Doing";
        }
      }
    } else {
      tempObj.status = status;
    }

    dispatch({
      type: "UPDATE_TASK",
      task: tempObj,
    });
  };

  return (
    <StyledColumn>
      {currentTask && (
        <ViewTask
          open={open}
          data={currentTask}
          closeView={closeModal}
          updateTaskStatus={updateTaskStatus}
        />
      )}

      <StyledHeading>
        <StyledStatusIndicator color={headingDotColor} />
        <h5>
          {name} ({tasks.length})
        </h5>
      </StyledHeading>
      <TaskListContainer className="task-test">
        {tasks.map((task) => (
          <Card task={task} key={task.title} onClick={selectTask(task)} />
        ))}
      </TaskListContainer>
    </StyledColumn>
  );
};

export default Column;
