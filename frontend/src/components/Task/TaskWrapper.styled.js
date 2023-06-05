import styled from "styled-components";

export const StyledTaskWrapper = styled.div`
  margin: auto;
  width: 345px;
  z-index: 101;
  position: relative;
  min-height: 255px;

  .scroll-container {
    background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
    padding: 30px 20px;
    border-radius: 6px;
    max-height: 600px;
    width: 100%;
    overflow-y: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .task-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 20px;
    position: relative;

    h4 {
      max-width: 80%;
      color: ${({ theme }) => theme.colors.cards.primaryText};
    }
  }

  .task-description {
    color: ${({ theme }) => theme.colors.cards.secondaryText};
    margin-bottom: 20px;
  }

  h6 {
    color: ${({ theme }) => theme.colors.cards.secondaryText};
    margin-bottom: 10px;
  }

  select {
    width: 100%;
  }

  @media (min-width: 768px) {
    width: 480px;

    .scroll-container {
      max-height: 90vh;
    }
  }
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

export const MoreDropdownBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
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
