import { useState, useRef, useEffect } from "react";
import ellipsisIcon from "../../assets/icon-vertical-ellipsis.svg";
import Subtask from "./Subtask";
import DeletePrompt from "../DeletePrompt";
import NewTask from "./NewTask";
import {
  StyledPopup,
  PopupMenu,
  DangerPopupMenuButton,
  NeutralPopupMenuButton,
  PopupTaskDescription,
  PopupSmallHeading,
  PopupTaskTitle,
  PopupMenuTrigger,
  PopupTaskStatus,
} from "../styles/Popup.styled";
import { useTasks } from "../hooks/useTasks";

const ViewTask = ({ open, data, closeView }) => {
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [changed, setChanged] = useState(false);
  const [taskStatus, setTaskStatus] = useState(false);
  const popupRef = useRef();
  const { deleteTask, editTask } = useTasks();

  useEffect(() => {
    if (data) {
      setTaskStatus(data.status);
      setSubtasks(data.subtasks);
    }
  }, [data]);

  useEffect(() => {
    const completedSubtasks = subtasks.filter(
      (item) => item.isCompleted === true
    );

    if (completedSubtasks.length === 0) {
      setTaskStatus("Todo");
    } else {
      if (completedSubtasks.length === subtasks.length) {
        setTaskStatus("Done");
      } else {
        setTaskStatus("Doing");
      }
    }
  }, [subtasks]);

  const countSubtasks = (subtasks) => {
    const completeTasks = subtasks.filter((item) => {
      if (item.isCompleted) return true;
      return false;
    }).length;
    return completeTasks + " of " + subtasks.length;
  };

  const openPrompt = () => {
    setOpenDeletePrompt(true);
    closeView();
  };

  const openEdit = () => {
    popupRef.current.open();
    closeView();
  };

  const handleDelete = () => {
    deleteTask(data._id);
    setOpenDeletePrompt(false);
  };

  const closePrompt = () => {
    setOpenDeletePrompt(false);
  };

  const handleOnClose = () => {
    if (changed) {
      editTask(data._id, { status: taskStatus, subtasks });
      setChanged(false);
    }

    closeView();
  };

  const updateSubtasks = (index, isCompleted) => {
    setSubtasks(
      subtasks.map((s, i) => (i === index ? { ...s, isCompleted } : s))
    );
    setChanged(true);
  };

  return (
    <>
      {data && (
        <>
          {/* View task popup ---> */}
          <StyledPopup open={open} onClose={handleOnClose} nested>
            <PopupTaskTitle className="tooltipBoundary">
              <h3>{data.title}</h3>
              <PopupMenu
                trigger={
                  <PopupMenuTrigger>
                    <img src={ellipsisIcon} alt="ellipsis" />
                  </PopupMenuTrigger>
                }
                position={["center top", "left top"]}
                arrow={false}
                nested
                offsetY={30}
                keepTooltipInside
              >
                <NeutralPopupMenuButton onClick={openEdit}>
                  Edit Task
                </NeutralPopupMenuButton>
                <DangerPopupMenuButton onClick={openPrompt}>
                  Delete Task
                </DangerPopupMenuButton>
              </PopupMenu>
            </PopupTaskTitle>
            <PopupTaskDescription>{data.description}</PopupTaskDescription>

            <PopupSmallHeading>
              Subtasks {countSubtasks(data.subtasks)}
            </PopupSmallHeading>
            {subtasks.map((subtask, i) => (
              <Subtask
                data={subtask}
                key={subtask.title}
                subtaskChange={(isCompleted) => updateSubtasks(i, isCompleted)}
              />
            ))}

            <PopupSmallHeading>Current Status</PopupSmallHeading>
            <PopupTaskStatus>{taskStatus}</PopupTaskStatus>
          </StyledPopup>
          {/* <--- View task popup */}

          {/* Delete board prompt popup ---> */}
          <StyledPopup
            open={openDeletePrompt}
            onClose={() => setOpenDeletePrompt(false)}
          >
            <DeletePrompt
              onDelete={handleDelete}
              cancelDelete={closePrompt}
              title={data.title}
              type={"task"}
            />
          </StyledPopup>
          {/* <--- Delete board prompt popup */}

          {/* Edit task popup ---> */}
          <NewTask editing taskData={data} ref={popupRef} />

          {/* <--- Edit task popup */}
        </>
      )}
    </>
  );
};

export default ViewTask;
