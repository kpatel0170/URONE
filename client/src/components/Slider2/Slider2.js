import React, { useState } from "react";
import { Box, ImageListItem, ImageList, CardMedia } from "@mui/material";
import styles from "./Slider2.module.css";

function Slider2(media) {
  const [gallery, setGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryHandler = (index) => {
    setCurrentIndex(index);
    setGallery(true);
  };

  const closeGalleryHandler = () => {
    setGallery(false);
  };

  const handleSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderMediaItems = () => (
    <Box>
      {media.media.map((item, index) => (
        <Box
          key={item}
          style={{ display: currentIndex === index ? "block" : "none" }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              onClick={() => handleSlide(index - 1)}
              className={styles.prev_btn}
              style={{ display: index === 0 ? "none" : "block" }}
            ></Box>
            <Box
              key={index}
              onClick={closeGalleryHandler}
              className={styles.current_media}
            >
              <CardMedia
                component="img"
                image={item}
                alt="rone_image"
                sx={{ height: "350px" }}
              />
            </Box>
            <Box
              onClick={() => handleSlide(index + 1)}
              className={styles.next_btn}
              style={{
                display: index === media.media.length - 1 ? "none" : "block"
              }}
            ></Box>
          </Box>
        </Box>
      ))}
      {renderGalleryItems()}
    </Box>
  );

  const renderGalleryItems = () => (
    <ImageList cols={8} rowHeight={50} sx={{ paddingTop: 0 }}>
      {media.media.map((item, index) => (
        <ImageListItem
          key={item}
          onClick={() => galleryHandler(index)}
          className={
            index === currentIndex
              ? `${styles.active} ${styles.gallery_container}`
              : styles.gallery_container
          }
        >
          <img
            src={`${item}`}
            alt={item}
            loading="lazy"
            className={styles.gallery_img}
          />
          <div></div>
        </ImageListItem>
      ))}
    </ImageList>
  );

  const renderZoomInGallery = () => {
    const numCols = media.media.length >= 3 ? 3 : media.media.length;
    return (
      <ImageList cols={numCols} rowHeight={210} sx={{ paddingTop: 0 }}>
        {media.media.map((item, index) => (
          <ImageListItem key={item} onClick={() => galleryHandler(index)}>
            <img
              src={`${item}`}
              alt={item}
              loading="lazy"
              className={styles.zoom_in_gallery}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  return (
    <Box sx={{ marginX: 2 }}>
      {gallery ? renderMediaItems() : renderZoomInGallery()}
    </Box>
  );
}

export default Slider2;
