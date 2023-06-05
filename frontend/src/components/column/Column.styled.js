import styled from "styled-components";

export const StyledColumn = styled.section`
  flex: 0 0 280px;

  &:not(&:last-child) {
    margin-right: 25px;
  }
`;

export const StyledHeading = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-transform: uppercase;
  line-height: 15px;
  letter-spacing: 2.4px;

  h5 {
    margin-left: 10px;
  }
`;

export const StyledStatusIndicator = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "red"};
`;

export const TaskListContainer = styled.div`
  max-height: calc(100vh - 130px);
  overflow: auto;

  padding-bottom: 20px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
