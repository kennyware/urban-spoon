import styled from "styled-components";
import sunIcon from "../assets/icon-light-theme.svg";
import moonIcon from "../assets/icon-dark-theme.svg";

const Wrapper = styled.div`
  width: 235px;
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.name === "light" ? "#fff" : theme.colors.body};
  border-radius: 6px;
`;

const Slider = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: ${({ theme }) => theme.colors.buttons.primaryBg};
    -webkit-transition: 0.4s;
    transition: 0.4s;

    @media (min-width: 768px) {
      :hover {
        background-color: ${({ theme }) => theme.colors.buttons.primaryHoverBg};
      }
    }
  }

  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    border-radius: 50%;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    transform: translateX(18px);
  }
`;

const ThemeSwitcher = ({ switchTheme, curTheme }) => {
  return (
    <Wrapper>
      <img src={sunIcon} alt="" />
      <Slider>
        <input
          type="checkbox"
          onChange={switchTheme}
          checked={curTheme === "light" ? false : true}
        />
        <span></span>
      </Slider>
      <img src={moonIcon} alt="" />
    </Wrapper>
  );
};

export default ThemeSwitcher;
