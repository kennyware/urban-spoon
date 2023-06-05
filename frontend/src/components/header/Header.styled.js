import styled from "styled-components";

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.darkGrey || "#fff"};
  width: 100vw;
  height: 65px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines};

  .logo-box {
    width: 24px;
    height: 25px;
  }

  .large-device-board-heading {
    display: none;
  }

  .add-task-span {
    display: none;
  }

  button {
    margin-right: 15px;
  }

  .header {
    color: #000;
    display: flex;
    align-items: center;
    height: 100%;
  }

  h1 {
    font-size: 18px;
    margin-left: 20px;
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primaryText};
  }

  @media (min-width: 768px) {
    height: 80px;

    .logo-box {
      height: 100%;
      width: 265px;
      border-right: 1px solid ${({ theme }) => theme.colors.lines};
    }

    .mobile-logo {
      display: none;
    }

    .mobile-board-logo {
      height: 100%;
    }

    .large-device-board-heading {
      display: initial;
    }

    .add-task-span {
      display: initial;
    }

    .add-task-icon {
      display: none;
    }

    .header-right-col {
      margin-left: auto;
    }
  }
`;

export const Picture = styled.picture`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 153px;
    display: grid;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 15px;
  padding-left: 10px;

  @media (min-width: 768px) {
    justify-content: normal;

    padding-left: 0;
  }
`;
