import styled from "styled-components";
import { ReactComponent as MenuIcon } from "../assets/icon-show-sidebar.svg";

const Button = styled.button`
  display: none;

  position: fixed;
  top: 90%;
  left: 0;
  background: ${({ theme }) => theme.colors.buttons.primaryBg};
  border: none;
  border-radius: 0 100px 100px 0;
  height: 48px;
  width: 56px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.buttons.primaryHoverBg};
  }

  @media (min-width: 768px) {
    display: initial;
  }
`;

const ToggleSidebar = ({ openSidebar }) => {
  return (
    <Button onClick={openSidebar}>
      <MenuIcon />
    </Button>
  );
};

export default ToggleSidebar;
