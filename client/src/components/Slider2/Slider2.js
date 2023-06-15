import React, { useState } from "react";
import { Box, ImageListItem, ImageList, CardMedia} from "@mui/material";
import styles from "./Slider2.module.css";

function Slider2(media) {
    console.log("... " ,media)
    const baseUrl = "http://localhost:3001/posts/";
    const [gallery, setGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [galleryLength, setGalleryLength] = useState(media.media.length);

    const galleryHandler = (index) => {
        console.log(index)
        setCurrentIndex(index)
        setGallery(true)
    }

    const closeGalleryHandler = () => {
        setGallery(false)
    }

    const prevSlide = (index) => {
        setCurrentIndex(index)
    }

    const nextSlide = (index) => {
        setCurrentIndex(index)
    }    

    return (
        <>
            {media.media.length > 2 ? (
                <Box sx={{marginX: 2}}>
                    {gallery ? (
                        <Box>
                            {media.media.map((item, index) => (
                                <Box key={item} style={{display: currentIndex === index ? "block": "none"}}>
                                    <Box sx={{position: 'relative'}}>
                                        <Box onClick={() => prevSlide(index-1)} className={styles.prev_btn} style={{display: (galleryLength-index === galleryLength) ? "none": "block"}}></Box>
                                        <Box key={index} onClick={closeGalleryHandler} className={styles.current_media}>
                                            <CardMedia
                                            component="img"
                                            image={baseUrl + item}
                                            alt="rone_image"
                                            sx={{ height: "350px" }}
                                            />
                                        </Box>
                                        <Box onClick={() =>nextSlide(index + 1)} className={styles.next_btn} style={{display: (galleryLength-(index+1) === 0) ? "none": "block"}}></Box>
                                    </Box>
                                    
                                </Box>
                            ))}
                            
                            <Box>
                                <ImageList cols={8} rowHeight={50} sx={{paddingTop: 0}}>
                                    {media.media.map((item, index) => (
                                        
                                        <ImageListItem sx={{border: 2, borderColor: 'transparent'}} key={item} onClick={() => galleryHandler(index)} className={index === currentIndex ? `${styles.active} ${styles.gallery_container}` : styles.gallery_container}>
                                            <img
                                                src={`${baseUrl+item}`}
                                                alt={item}
                                                loading="lazy"
                                                className={styles.gallery_img}
                                            />
                                            <div></div>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                        </Box>
                    ) : (
                        <ImageList cols={3} rowHeight={164} sx={{paddingTop: 0}}>
                            {media.media.map((item, index) => (
                                <ImageListItem key={item} onClick={() => galleryHandler(index)}>
                                    <img
                                        src={`${baseUrl+item}`}
                                        alt={item}
                                        loading="lazy"
                                        className={styles.zoom_in_gallery}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </Box>
            ) : (
                <Box sx={{marginX: 2}}>
                    {gallery ? (
                        <Box>
                            {media.media.map((item, index) => (
                                <Box key={item} style={{display: currentIndex === index ? "block": "none"}}>
                                    <Box sx={{position: 'relative'}}>
                                        <Box onClick={() => prevSlide(index-1)} className={styles.prev_btn} style={{display: (galleryLength-index === galleryLength) ? "none": "block"}}></Box>
                                        <Box key={index} onClick={closeGalleryHandler} className={styles.current_media}>
                                            <CardMedia
                                            component="img"
                                            image={baseUrl + item}
                                            alt="rone_image"
                                            sx={{ height: "350px" }}
                                            />
                                        </Box>
                                        <Box onClick={() =>nextSlide(index + 1)} className={styles.next_btn} style={{display: (galleryLength-(index+1) === 0) ? "none": "block"}}></Box>
                                    </Box>
                                    
                                </Box>
                            ))}
                            
                            <Box>
                                <ImageList cols={8} rowHeight={50} sx={{paddingTop: 0}}>
                                    {media.media.map((item, index) => (
                                        
                                        <ImageListItem sx={{border: 2, borderColor: 'transparent'}} key={item} onClick={() => galleryHandler(index)} className={index === currentIndex ? `${styles.active} ${styles.gallery_container}` : styles.gallery_container}>
                                            <img
                                                src={`${baseUrl+item}`}
                                                alt={item}
                                                loading="lazy"
                                                className={styles.gallery_img}
                                            />
                                            <div></div>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                        </Box>
                    ) : (
                        <ImageList cols={2} rowHeight={210} sx={{paddingTop: 0}}>
                            {media.media.map((item, index) => (
                                <ImageListItem key={item} onClick={() => galleryHandler(index)}>
                                    <img
                                        src={`${baseUrl+item}`}
                                        alt={item}
                                        loading="lazy"
                                        className={styles.zoom_in_gallery}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </Box>
            )}
            
        </>
    )
}

export default Slider2