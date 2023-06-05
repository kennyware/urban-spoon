import styled, { keyframes } from "styled-components";
import { StyledPrimaryButton } from "../../Button.styled";
import Popup from "reactjs-popup";

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3e3f4e;
  padding: 20px 40px;
`;

export const Navbar = styled.nav`
  margin-left: auto;
  display: flex;
  padding: 10px 0;
`;

export const NavbarItem = styled.div`
  display: none;
  margin-right: 15px;
  a {
    text-decoration: none;
    color: #000112;

    :hover {
      color: #a8a4ff;
    }
  }

  @media (min-width: 768px) {
    display: initial;
  }
`;
export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.buttons.primaryBg};
`;

export const WelcomeSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .welcome-hero {
      text-align: center;
    }

    .intro {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .welcome-copy {
      margin-bottom: 40px;
      max-width: 470px;
    }

    .hero {
      margin-top: 50px;
      display: none;
    }
  }
  background: #e4ebfa;

  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      width: 100%;
      justify-content: space-around;

      .welcome-hero {
        text-align: left;
        width: 390px;

        button {
          margin: 0;
        }
      }
      .hero {
        margin-top: 0;
        display: block;
      }
    }
  }
`;

export const ActionButton = styled(StyledPrimaryButton)`
  width: 175px;
  margin-left: auto;
  margin-right: auto;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const MenuButton = styled.button`
  background: none;
  outline: none;
  border: none;
  display: block;
  height: 25px;
  width: 25px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const FeaturesSection = styled.section`
  margin-bottom: 50px;
  .content {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  @media (min-width: 768px) {
    .content {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`;

export const Feature = styled.div`
  max-width: 340px;
  margin: 20px auto;
  img {
    width: 50px;
    height: 50px;
    color: #635fc7;
    margin-bottom: 10px;
  }
`;

export const ScreenshotSection = styled.section`
  .carousel-wrapper {
    background: rgba(0, 0, 0, 0.1);
    padding-top: 100px;
    padding-bottom: 100px;
    width: 100%;
  }

  .call-to-action {
    width: 600px;
    margin: auto;
    margin-bottom: 30px;
  }
`;

export const Heading = styled.h2`
  text-align: center;
  text-decoration: underline;
  margin-bottom: 40px;
  color: #2b2c37;
`;

export const Paragrapgh = styled.p`
  color: #2b2c37;
`;

export const Footer = styled.div`
  width: 100%;
  height: 100px;
  background: #828fa3;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    border-bottom: 1px solid #e4ebfa;
    color: #fff;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-1000px)
  }

  to {
    transform: translateY(0px)
  }
`;

export const PopupMenu = styled(Popup)`
  @media (min-width: 768px) {
    display: none;
  }

  &-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  &-content {
    height: 300px;
    width: 100vw;
    background: #fff;
    margin: 0 !important;
    animation: ${slideDown} 0.3s ease forwards;

    .close-menu-btn {
      float: right;
      background: none;
      border: none;
      margin-right: 20px;
      font-size: 1.5em;
      margin-bottom: 30px;
      margin-top: 10px;
    }

    .nav {
      clear: both;
      text-align: center;

      .nav-item {
        margin-top: 30px;
      }

      .nav-link {
        text-decoration: none;
        color: #000;
      }
    }
  }
`;
