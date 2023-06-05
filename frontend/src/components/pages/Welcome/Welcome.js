import { Link } from "react-router-dom";
import {
  ActionButton,
  Header,
  Highlight,
  Navbar,
  NavbarItem,
  WelcomeSection,
  MenuButton,
  Feature,
  FeaturesSection,
  ScreenshotSection,
  Heading,
  Paragrapgh,
  Footer,
  PopupMenu,
} from "./Welcome.styled";
import bigLogo from "../../../assets/logo-dark.svg";
import { ReactComponent as MenuIcon } from "../../../assets/icon-menu.svg";
import heroImg from "../../../assets/hero-transformed.png";
import gridIcon from "../../../assets/grid.svg";
import gearIcon from "../../../assets/gear-solid.svg";
import lightbulbIcon from "../../../assets/lightbulb-regular.svg";
import noteIcon from "../../../assets/note-sticky-regular.svg";
import Carousel from "./Carousel";

const Welcome = () => {
  return (
    <>
      <Header>
        <img src={bigLogo} alt="Logo" />
        <Navbar>
          <NavbarItem>
            <a href="#features">Features</a>
          </NavbarItem>
          <NavbarItem>
            <Link to={"/login"}>Log In</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to={"/register"}>Sign Up</Link>
          </NavbarItem>
          {/* Popup Nav */}
          <PopupMenu
            trigger={
              <MenuButton>
                <MenuIcon color="#000" />
              </MenuButton>
            }
            modal
          >
            {(close) => (
              <div className="menu">
                <button className="close-menu-btn" onClick={() => close()}>
                  x
                </button>
                <nav className="nav">
                  <div className="nav-item" onClick={() => close()}>
                    <a href="#features" className="nav-link">
                      Features
                    </a>
                  </div>
                  <div className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Log In
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </PopupMenu>
        </Navbar>
      </Header>
      <WelcomeSection id="welcome">
        <div className="container">
          <div className="welcome-hero">
            <Paragrapgh className="intro">
              <Highlight>Welcome</Highlight> to our cutting-edge note taking
              app!
            </Paragrapgh>
            <Paragrapgh className="welcome-copy">
              Whether you're a student, professional, or just someone who loves
              jotting down ideas, our app is designed to simplify and enhance
              your note-taking experience.
            </Paragrapgh>
            <ActionButton>
              <Link to={"/register"}>Sign Up Now!</Link>
            </ActionButton>
          </div>
          <div className="hero">
            <img className="hero-img" src={heroImg} alt="" />
          </div>
        </div>
      </WelcomeSection>
      <FeaturesSection className="container" id="features">
        <Heading>Core Features</Heading>
        <div className="content">
          <Feature>
            <img src={noteIcon} alt="" />
            <Paragrapgh>
              The ability to create, edit, and format notes easily, including
              options for text formatting, bullet points, numbering, and adding
              images or attachments.
            </Paragrapgh>
          </Feature>
          <Feature>
            <img src={lightbulbIcon} alt="" />
            <Paragrapgh>
              Customization options, such as themes, fonts, and color schemes,
              allowing users to personalize their note-taking experience and
              make it visually appealing and tailored to their preferences.
            </Paragrapgh>
          </Feature>
          <Feature>
            <img src={gearIcon} alt="" />
            <Paragrapgh>
              Robust security measures, such as encryption, password protection,
              or biometric authentication options, to ensure that users' notes
              and personal information are kept safe and secure.
            </Paragrapgh>
          </Feature>
          <Feature>
            <img src={gridIcon} alt="" />
            <Paragrapgh>
              Accessibility features, such as support for screen readers, voice
              dictation, and other accessibility options to ensure that the app
              is inclusive and usable for all users, regardless of their
              abilities.
            </Paragrapgh>
          </Feature>
        </div>
      </FeaturesSection>
      <ScreenshotSection id="screenshots">
        <Heading>Screenshots</Heading>
        <div className="carousel-wrapper">
          <Carousel />
        </div>
      </ScreenshotSection>
      <Footer>
        <div className="content">Made by Kenny Ware 2023</div>
      </Footer>
    </>
  );
};

export default Welcome;
