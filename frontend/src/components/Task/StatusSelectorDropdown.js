import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/icon-chevron-down.svg";
import Popup from "reactjs-popup";

const StyledStatusDropdown = styled.div`
  width: 100%;
`;

const DropdownContent = styled.div`
  background: ${({ theme }) => theme.colors.body};
  width: 100%;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.secondaryText};
  ul {
    list-style-type: none;
    margin: 10px 0;

    li {
      padding: 15px 10px;
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => theme.colors.buttons.primaryHoverBg};
      }
    }
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, open }) => (open ? theme.colors.cards.hover : `#828fa340`)};
  background: none;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.primaryText};
  }

  .icon {
    margin-left: auto;
  }

  :hover {
    border-color: ${({ theme }) => theme.colors.cards.hover};
  }
`;

const StyledPopup = styled(Popup)`
  &-content {
    width: 305px;

    @media (min-width: 768px) {
      width: 440px;
    }
  }
`;

const StatusSelectorDropdown = ({ currentStatus, statusChange }) => {
  const status = currentStatus || "Todo";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Todo", "Doing", "Done"];

  const selectItem = (option) => (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setSelectedOption(option);
    statusChange(option);
  };

  return (
    <StyledStatusDropdown>
      <StyledPopup
        open={isOpen}
        trigger={
          <DropdownButton type="button" open={isOpen}>
            <span>{selectedOption || status}</span>
            <ArrowIcon className="icon" />
          </DropdownButton>
        }
        arrow={false}
        nested
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <DropdownContent>
          <ul>
            {options.map((option) => (
              <li onClick={selectItem(option)} key={option}>
                {option}
              </li>
            ))}
          </ul>
        </DropdownContent>
      </StyledPopup>
    </StyledStatusDropdown>
  );
};

export default StatusSelectorDropdown;
