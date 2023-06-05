import { useState } from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactComponent as BoardIcon } from "../assets/icon-board.svg";
import { ReactComponent as HideSidebarIcon } from "../assets/icon-hide-sidebar.svg";
import { ReactComponent as LogoutIcon } from "../assets/icon-power.svg";
import lightLogo from "../assets/logo-light.svg";
import darkLogo from "../assets/logo-dark.svg";
import { useTheme } from "styled-components";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./context/AuthContext";
import { useTasksContext } from "./context/TasksContext";
import { useTasks } from "./hooks/useTasks";
import {
  PopupForm,
  PopupFormGroup,
  PopupHeading,
  PopupInput,
  PopupLabel,
  StyledPopup,
} from "./styles/Popup.styled";

import { StyledPrimaryButton, StyledDestructiveButton } from "./Button.styled";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
  border-right: 1px solid ${({ theme }) => theme.colors.lines};
  width: 265px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .align-to-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 50px;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;
const Content = styled.div`
  padding-top: 20px;
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
  margin-bottom: 20px;
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

  height: 48px;
  width: 90%;
  border: none;
  font-weight: 700;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  .board-icon {
    margin-right: 15px;
  }

  :hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const HideSidebarButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 700;
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-top: 10px;
  cursor: pointer;
  height: 48px;
  width: 90%;
  border-radius: 0 35px 35px 0;

  span {
    margin-left: 10px;
  }

  :hover {
    background: ${({ theme }) => theme.colors.buttons.secondaryBg};
    color: ${({ theme }) => theme.colors.buttons.secondaryText};
  }
`;

const Image = styled.img`
  width: 153px;
`;

const ImageBox = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  width: 16px;
  height: 16px;
`;

const BoardMenuSidebar = ({ switchTheme, toggleSidebar }) => {
  const [name, setName] = useState("");
  const theme = useTheme();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { board, boards, dispatch } = useTasksContext();
  const { addBoard } = useTasks();

  const setBoard = (id) => {
    dispatch({ type: "SET_BOARD", board: id });
  };

  const handleSubmit = (e, close) => {
    e.preventDefault();
    addBoard(name);
    close();
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <ImageBox>
        <Image src={theme.name === "light" ? darkLogo : lightLogo} />
      </ImageBox>
      <Content>
        <h3>All Boards ({boards.length})</h3>
        {boards.map((item) => (
          <BoardItem
            key={item._id}
            active={item._id === board._id}
            onClick={() => setBoard(item._id)}
          >
            <BoardIcon className="board-icon" /> {item.name}
          </BoardItem>
        ))}
        <StyledPopup
          trigger={
            <NewBoardButton>
              <BoardIcon className="board-icon" />
              +Create New Board
            </NewBoardButton>
          }
          modal
        >
          {(close) => (
            <PopupForm onSubmit={(e) => handleSubmit(e, close)}>
              <PopupHeading>Add New Board</PopupHeading>
              <PopupFormGroup>
                <PopupLabel htmlFor="title">Name</PopupLabel>
                <PopupInput
                  type="text"
                  placeholder="e.g Take cofee break"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </PopupFormGroup>

              <StyledPrimaryButton
                type="submit"
                marginBottom="10px"
                className="fullWidth-btn"
              >
                Create New Board
              </StyledPrimaryButton>
              <StyledDestructiveButton
                type="button"
                className="fullWidth-btn"
                onClick={close}
              >
                Cancel
              </StyledDestructiveButton>
            </PopupForm>
          )}
        </StyledPopup>
      </Content>
      <div className="align-to-bottom">
        <ThemeSwitcher switchTheme={switchTheme} curTheme={theme.name} />
        <HideSidebarButton onClick={toggleSidebar}>
          <HideSidebarIcon /> <span>Hide Sidebar</span>
        </HideSidebarButton>
        {user && (
          <HideSidebarButton onClick={logout}>
            <StyledLogoutIcon /> <span>Logout</span>
          </HideSidebarButton>
        )}
      </div>
    </Wrapper>
  );
};

export default BoardMenuSidebar;
