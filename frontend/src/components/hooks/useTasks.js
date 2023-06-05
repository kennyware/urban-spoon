import { useAuthContext } from "../context/AuthContext";
import { useTasksContext } from "../context/TasksContext";
import { useState } from "react";

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, board, boards } = useTasksContext();
  const { user } = useAuthContext();

  const fetchBoards = async () => {
    setIsLoading(true);
    const response = await fetch("/api/boards", {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(json.error);
    }

    if (response.ok) {
      dispatch({ type: "GET_BOARDS", boards: json });
      dispatch({ type: "SET_BOARD", board: json[0]._id });
      setIsLoading(false);
    }
  };

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

  const addTask = async (task) => {
    setIsLoading(true);
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      body: JSON.stringify({ board: board._id, ...task }),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "ADD_TASK", task: json });
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", id });
      setIsLoading(false);
    }
  };

  const editTask = async (id, data) => {
    setIsLoading(true);
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_TASK", task: json });
      setIsLoading(false);
    }
  };

  const addBoard = async (name) => {
    setIsLoading(true);
    const response = await fetch(`/api/boards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "ADD_BOARD", board: json });
      dispatch({ type: "SET_BOARD", board: json._id });
      setIsLoading(false);
    }
  };

  const editBoard = async (name) => {
    setIsLoading(true);
    const response = await fetch(`/api/boards/${board._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_BOARD", board: json });
      setIsLoading(false);
    }
  };

  const deleteBoard = async (id) => {
    setIsLoading(true);
    const response = await fetch(`/api/boards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.error(json.error);
    }

    if (response.ok) {
      dispatch({ type: "DELETE_BOARD", id });
      dispatch({ type: "SET_BOARD", board: boards[0]._id });
      setIsLoading(false);
    }
  };

  return {
    fetchBoards,
    fetchTasks,
    addTask,
    deleteTask,
    editTask,
    addBoard,
    editBoard,
    deleteBoard,
    isLoading,
  };
};
