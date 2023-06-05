import { createContext, useReducer, useContext } from "react";

export const TasksContext = createContext();

export const useTasksContext = () => {
  return useContext(TasksContext);
};

export const sortTasksByStatus = (filter, tasks) => {
  return tasks.filter((task) => task.status === filter);
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    boards: null,
    board: null,
    tasks: [],
  });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOARDS": {
      return {
        ...state,
        boards: action.boards,
      };
    }
    case "SET_BOARD": {
      return {
        ...state,
        board: state.boards.filter((b) => b._id === action.board)[0],
      };
    }
    case "ADD_BOARD": {
      return {
        ...state,
        boards: [...state.boards, action.board],
      };
    }
    case "UPDATE_BOARD": {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board._id === action.board._id ? action.board : board
        ),
        board: action.board,
      };
    }
    case "DELETE_BOARD": {
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.id),
        board: null,
      };
    }
    case "GET_TASKS": {
      return {
        ...state,
        tasks: action.tasks,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === action.task._id) {
            return action.task;
          } else {
            return task;
          }
        }),
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.id),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
