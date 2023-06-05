import { useState, useEffect } from "react";
import Board from "../board/Board";
import Header from "../header/Header";
import ToggleSidebar from "../ToggleSidebar";
import BoardMenuSidebar from "../BoardMenuSidebar";
import styled from "styled-components";
import { useTasksContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "../Spinner";

const BoardContainer = styled.section`
  @media (min-width: 768px) {
    ${({ sidebarOpen }) =>
      sidebarOpen &&
      `      padding-left: 285px;
    `}
  }
`;

const HomeContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.body};
`;

const Home = ({ changeTheme }) => {
  const [addingTask, setAddingTask] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const { dispatch, board } = useTasksContext();

  const addTask = (isAdding) => {
    isAdding ? setAddingTask(true) : setAddingTask(false);
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const fetchTasks = async () => {
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

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return isLoading ? (
    <Spinner />
  ) : (
    <HomeContainer>
      {board && (
        <>
          <Header addTaskClick={addTask} switchTheme={changeTheme} />
          {showSidebar ? (
            <BoardMenuSidebar
              toggleSidebar={toggleMenu}
              switchTheme={changeTheme}
            />
          ) : (
            <ToggleSidebar openSidebar={toggleMenu} />
          )}
          <BoardContainer sidebarOpen={showSidebar}>
            <Board
              addingTask={addingTask}
              addTask={addTask}
              taskAdded={() => setAddingTask(false)}
            />
          </BoardContainer>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
