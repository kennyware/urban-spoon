import { useRef } from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactComponent as BoardIcon } from "../assets/icon-board.svg";
import { useTasksContext } from "./context/TasksContext";
import BoardFormPopup from "./board/BoardFormPopup";
import { useTheme } from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
  border-radius: 10px;
  width: 265px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
  margin-top: 50px;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
`;
const Content = styled.div`
  h3 {
    margin: 0 30px 20px 30px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;
const BoardItem = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.colors.buttons.primaryBg : "transparent"};
  border-radius: 0 35px 35px 0;
  border: none;
  outline: 0;
  color: ${({ theme, active }) =>
    active ? theme.colors.buttons.primaryText : theme.colors.secondaryText};
  font-weight: 700;
  padding-left: 30px;
  margin-bottom: 10px;
  width: 90%;
  height: 48px;
  display: flex;
  align-items: center;
  transition: all 0.05s ease;

  ${({ active }) => !active && `cursor: pointer;`}

  :hover {
    color: ${({ theme, active }) =>
      !active && theme.colors.buttons.secondaryText};
  }

  .board-icon {
    margin-right: 15px;
  }
`;
const NewBoardButton = styled.button`
  color: ${({ theme }) => theme.colors.buttons.secondaryText};
  padding-left: 30px;
  margin-bottom: 15px;
  height: 48px;
  width: 90%;
  border: none;
  font-weight: 700;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;

  .board-icon {
    margin-right: 15px;
  }

  :hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const Menu = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MobileBoardMenu = ({ switchTheme, closeMenu }) => {
  const { board, boards, dispatch } = useTasksContext();
  const ref = useRef();
  const theme = useTheme();

  const handleClick = (id) => {
    dispatch({ type: "SET_BOARD", board: id });
    closeMenu();
  };

  const openBoardForm = () => {
    ref.current.open();
  };

  return (
    <Menu onClick={closeMenu}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Content>
          <h3>All Boards ({boards.length})</h3>
          {boards.map((item) => (
            <BoardItem
              key={item._id}
              active={item._id === board._id}
              onClick={() => handleClick(item._id)}
            >
              <BoardIcon className="board-icon" /> {item.name}
            </BoardItem>
          ))}
          <NewBoardButton onClick={openBoardForm}>
            <BoardIcon className="board-icon" />
            +Create New Board
          </NewBoardButton>
        </Content>
        <ThemeSwitcher switchTheme={switchTheme} curTheme={theme.name} />
      </Wrapper>
      {/* Board Form Popup ---> */}
      <BoardFormPopup ref={ref} closeMenu={closeMenu} />
      {/* <--- Board Form Popup */}
    </Menu>
  );
};

export default MobileBoardMenu;
