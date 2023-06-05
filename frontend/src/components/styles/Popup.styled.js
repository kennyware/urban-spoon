import styled from "styled-components";
import Popup from "reactjs-popup";

export const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.4);
  }

  &-content {
    background: #fff;
    background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
    padding: 30px 20px;
    border-radius: 6px;
    max-height: 95vh;
    width: 345px;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 768px) {
      width: 480px;
      max-height: 90vh;
    }
  }
`;

export const PopupForm = styled.form`
  .fullWidth-btn {
    width: 100%;
  }
`;

export const PopupFormControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 85%;
  }
`;

export const PopupHeading = styled.h3`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const PopupFormGroup = styled.div`
  margin-bottom: 20px;
`;
export const PopupLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.cards.secondaryText};
  margin-bottom: 5px;
  font-weight: 700;
`;

export const PopupInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #828fa340;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primaryText};
  outline: none;

  &::placeholder {
    opacity: 40%;
  }

  :focus {
    border-color: ${({ theme }) => theme.colors.cards.hover};
  }
`;

export const PopupTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px 15px;
  border: 1px solid #828fa340;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primaryText};
  outline: none;

  &::placeholder {
    opacity: 40%;
  }

  :focus {
    border-color: ${({ theme }) => theme.colors.cards.hover};
  }
`;

export const PopupMenu = styled(Popup)`
  &-content {
    background: ${({ theme }) => theme.colors.body};
    width: 192px;
    height: 95px;
    padding: 0 15px;
    border-radius: 8px;
    box-shadow: #777 0px 1px 3px 1px;
  }
`;

export const PopupMenuButton = styled.button`
  border: none;
  background: none;
  display: block;
  margin-top: 20px;
  cursor: pointer;
  outline: none;
`;

export const NeutralPopupMenuButton = styled(PopupMenuButton)`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const DangerPopupMenuButton = styled(PopupMenuButton)`
  color: ${({ theme }) => theme.colors.buttons.destructiveText};
`;

export const PopupTaskTitle = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 20px;
  position: relative;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const PopupTaskDescription = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 20px;
`;

export const PopupSmallHeading = styled.h6`
  color: ${({ theme }) => theme.colors.cards.secondaryText};
  margin-bottom: 10px;
`;

export const PopupTaskSelect = styled.select`
  width: 100%;
`;

export const PopupTaskStatus = styled.p`
  width: 100%;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, open }) => (open ? theme.colors.cards.hover : `#828fa340`)};
  background: none;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const CloseModalBtn = styled.button`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
`;

export const PopupMenuTrigger = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  outline: 0;
`;

export const MoreDropdownMenu = styled.div`
  position: absolute;
  top: 80px;
  right: -4%;
  background: ${({ theme }) => theme.colors.body};
  width: 192px;
  padding: 0 15px;
  border-radius: 8px;
  box-shadow: #777 0px 2px 8px 2px;
`;
