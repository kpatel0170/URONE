import React, { useState } from "react";
import styles from "./Slider.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";

function Slider({ media }) {
  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);

  const nextSlide = () => {
    setCurrentActiveSlide((currentActiveSlide + 1) % media.length);
  };

  const previousSlide = () => {
    setCurrentActiveSlide(
      (currentActiveSlide - 1 + media.length) % media.length
    );
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginX: 2,
          background: "#e6e7ee"
        }}
      >
        <IconButton
          onClick={previousSlide}
          sx={{ position: "absolute", left: "1rem", top: "50%", zIndex: 1 }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {media.map((currentSlide, index) => (
          <Box
            className={`${index === currentActiveSlide ? styles.active : ""} ${
              styles.currentSlide
            }`}
            key={index}
            sx={{ height: "350px", overflow: "hidden" }}
          >
            {index === currentActiveSlide && (
              <img
                src={currentSlide}
                alt={`slide-${index}`}
                className={styles.media_image}
              />
            )}
          </Box>
        ))}

        <IconButton
          onClick={nextSlide}
          sx={{ position: "absolute", right: "1rem", top: "50%", zIndex: 1 }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Slider;
