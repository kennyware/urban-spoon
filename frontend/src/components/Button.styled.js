import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : `pointer`)};
  transition: all 0.05s ease;
  margin-top: ${({ marginTop }) => marginTop};
  margin-right: ${({ marginRight }) => marginRight};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background-color: ${({ $disabled, theme }) =>
    $disabled
      ? theme.colors.buttons.primaryHoverBg
      : theme.colors.buttons.primaryBg};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.secondaryText : theme.colors.buttons.primaryText};

  :hover {
    background-color: ${({ theme }) => theme.colors.buttons.primaryHoverBg};
  }
`;

export const StyledSecondaryButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.buttons.secondaryBg};
  color: ${({ theme }) => theme.colors.buttons.secondaryText};
`;

export const StyledDestructiveButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.buttons.destructiveBg};
  color: ${({ theme }) => theme.colors.buttons.primaryText};

  :hover {
    background-color: ${({ theme }) => theme.colors.buttons.destructiveHoverBg};
  }
`;
