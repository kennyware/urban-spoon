import { useState, useEffect, useRef } from "react";
import { StyledHeader, Picture, HeaderContainer } from "./Header.styled";
import { StyledPrimaryButton } from "../Button.styled";
import { useTheme } from "styled-components";
import mobileLogo from "../../assets/logo-mobile.svg";
import lightLogo from "../../assets/logo-light.svg";
import darkLogo from "../../assets/logo-dark.svg";
import downChevronIcon from "../../assets/icon-chevron-down.svg";
import addTaskIcon from "../../assets/icon-add-task-mobile.svg";
import ellipsisIcon from "../../assets/icon-vertical-ellipsis.svg";
import MobileBoardMenu from "../MobileBoardMenu";
import { MoreDropdownBtn } from "../Task/TaskWrapper.styled";
import { useTasksContext } from "../context/TasksContext";
import { StyledDestructiveButton } from "../Button.styled";
import {
  PopupForm,
  PopupFormGroup,
  PopupHeading,
  PopupInput,
  PopupLabel,
  StyledPopup,
  PopupMenu,
  DangerPopupMenuButton,
  NeutralPopupMenuButton,
} from "../styles/Popup.styled";
import { useTasks } from "../hooks/useTasks";
import DeletePrompt from "../DeletePrompt";
import NewTask from "../Task/NewTask";

const Header = ({ switchTheme }) => {
  const { boards, board, dispatch } = useTasksContext();
  const theme = useTheme();
  const [openBoardMenu, setOpenBoardMenu] = useState(false);
  const [openBoardForm, setOpenBoardForm] = useState(false);
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const [name, setName] = useState("");
  const { editBoard, deleteBoard } = useTasks();
  const ref = useRef();

  useEffect(() => {
    if (board) {
      setName(board.name);
    }
  }, [board, setName]);

  const handleClick = () => {
    ref.current.open();
  };

  const headerClick = () => {
    setOpenBoardMenu(!openBoardMenu);
  };

  const rotate = () => {
    return openBoardMenu ? "rotate(180deg)" : "";
  };

  const openModal = (close) => {
    setOpenBoardForm((o) => !o);
    close();
  };

  const openPrompt = (close) => {
    setOpenDeletePrompt((o) => !o);
    close();
  };

  const closeModal = () => {
    setOpenBoardForm(false);
  };

  const closePrompt = () => {
    setOpenDeletePrompt(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBoard(name);
    closeModal();
  };

  const handleDelete = () => {
    dispatch({ type: "SET_BOARD", board: boards[0]._id });
    deleteBoard(board._id);
    closePrompt();
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <div className="header">
          <div className="mobile-board-logo center-align-vertical">
            <div className="logo-box">
              <Picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={theme.name === "light" ? darkLogo : lightLogo}
                />
                <img src={mobileLogo} alt="Logo" />
              </Picture>
            </div>
            <div
              className="mobile-logo center-align-vertical"
              onClick={headerClick}
            >
              {board && <h1>{board.name}</h1>}
              <img
                className="logo-down-arrow"
                src={downChevronIcon}
                alt="Downward chevron"
                style={{ transform: rotate() }}
              />
            </div>
          </div>
        </div>

        {board && <h1 className="large-device-board-heading">{board.name}</h1>}

        <div className="header-right-col center-align-vertical">
          <StyledPrimaryButton onClick={handleClick}>
            <span className="add-task-span">+ Add New Task</span>
            <img src={addTaskIcon} alt="plus sign" className="add-task-icon" />
          </StyledPrimaryButton>

          <PopupMenu
            trigger={
              <MoreDropdownBtn>
                <img src={ellipsisIcon} alt="ellipsis" />
              </MoreDropdownBtn>
            }
            position="center center"
            arrow={false}
            keepTooltipInside
            offsetY={20}
          >
            {(close) => (
              <>
                <NeutralPopupMenuButton onClick={() => openModal(close)}>
                  Edit Board
                </NeutralPopupMenuButton>
                <DangerPopupMenuButton onClick={() => openPrompt(close)}>
                  Delete Board
                </DangerPopupMenuButton>
              </>
            )}
          </PopupMenu>
        </div>
      </HeaderContainer>

      {/* Add Task Popup */}
      <NewTask ref={ref} />

      {/* Edit Board Popup ---> */}
      <StyledPopup open={openBoardForm} onClose={closeModal}>
        <PopupForm onSubmit={handleSubmit}>
          <PopupHeading>Edit Board</PopupHeading>
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
            Save Changes
          </StyledPrimaryButton>
          <StyledDestructiveButton
            type="button"
            className="fullWidth-btn"
            onClick={closeModal}
          >
            Cancel
          </StyledDestructiveButton>
        </PopupForm>
      </StyledPopup>
      {/* <--- Edit Board Popup */}

      {/* Delete board prompt popup ---> */}
      <StyledPopup
        open={openDeletePrompt}
        onClose={() => setOpenDeletePrompt(false)}
      >
        <DeletePrompt
          onDelete={handleDelete}
          cancelDelete={closePrompt}
          title={board.name}
          type={"board"}
        />
      </StyledPopup>
      {/* <--- Delete board prompt popup */}

      {/* Board menu ---> */}
      {openBoardMenu && (
        <MobileBoardMenu
          switchTheme={switchTheme}
          closeMenu={() => setOpenBoardMenu(false)}
        />
      )}
      {/* <--- Board menu */}
    </StyledHeader>
  );
};

export default Header;
