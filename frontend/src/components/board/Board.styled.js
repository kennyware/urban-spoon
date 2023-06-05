import styled from "styled-components";

export const StyledBoard = styled.main`
  .empty-board-prompt {
    display: flex;
    min-height: calc(100vh - 60px);
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    padding: 0 20px;

    p {
      margin-bottom: 20px;
      color: #828fa3;
    }
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;
