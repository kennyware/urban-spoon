import { useRef, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Swiper, SwiperSlide } from "swiper/react";
import Screenshot1 from "../../../assets/screenshot-home-light.png";
import Screenshot2 from "../../../assets/screenshot-home-empty-light.png";
import Screenshot3 from "../../../assets/screenshot-board-light.png";
import Screenshot4 from "../../../assets/screenshot-add-dark.png";
import Screenshot5 from "../../../assets/screenshot-home-dark.png";
import Screenshot6 from "../../../assets/screenshot-view-dark.png";
import MobileScreenshot1 from "../../../assets/iphone-screenshot-home-light.png";
import MobileScreenshot2 from "../../../assets/iphone-screenshot-home-light.png";
import MobileScreenshot3 from "../../../assets/iphone-screenshot-menu-light.png";
import MobileScreenshot4 from "../../../assets/iphone-screenshot-task-dark.png";
import MobileScreenshot5 from "../../../assets/iphone-screenshot-home-dark.png";
import MobileScreenshot6 from "../../../assets/iphone-screenshot-view-dark.png";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCoverflow, Autoplay } from "swiper";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.7);
  }

  &-content {
  }
`;

const ModalImage = styled.img`
  width: 80%;
  margin: auto;
  display: block;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 1300px;

  .swiper-image {
    display: block;
    width: 100%;
    margin: auto;

    :hover {
      cursor: pointer;
    }
  }
`;

const slideImages = [
  { mobile: MobileScreenshot1, desktop: Screenshot1 },
  { mobile: MobileScreenshot2, desktop: Screenshot2 },
  { mobile: MobileScreenshot3, desktop: Screenshot3 },
  { mobile: MobileScreenshot4, desktop: Screenshot4 },
  { mobile: MobileScreenshot5, desktop: Screenshot5 },
  { mobile: MobileScreenshot6, desktop: Screenshot6 },
];

const Carousel = () => {
  const ref = useRef();
  const swiperRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState("");
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  useEffect(() => {
    if (modalOpen) {
      swiperRef.current.swiper.autoplay.pause();
    } else {
      swiperRef.current.swiper.autoplay.resume();
    }
  });

  const handleClick = (image) => {
    if (mediaQuery.matches) {
      setModalSlide(image.desktop);
    } else {
      setModalSlide(image.mobile);
    }
    ref.current.open();
  };

  return (
    <>
      <StyledSwiper
        ref={swiperRef}
        effect={"coverflow"}
        autoplay={{
          delay: 2500,
        }}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slideImages.map((image, i) => (
          <SwiperSlide key={i}>
            <picture onClick={() => handleClick(image)}>
              <source
                media="(min-width: 768px)"
                srcSet={image.desktop}
                className="swiper-image"
              />
              <img src={image.mobile} className="swiper-image" alt="" />
            </picture>
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <StyledPopup
        ref={ref}
        modal
        onOpen={() => setModalOpen(true)}
        onClose={() => setModalOpen(false)}
      >
        <ModalImage src={modalSlide} alt="" />
      </StyledPopup>
    </>
  );
};

export default Carousel;
