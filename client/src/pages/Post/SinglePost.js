import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import Newsfeed from "../../components/Newsfeed/Newsfeed";
import PostForm from "../../components/Post/PostForm";
import styles from "../Home/Home.module.css";
import {
  getSinglePost,
  reset,
  setPostDetailId
} from "../../features/Post/PostSlice";
import Loading from "../../components/Loading/Loading";

function SinglePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPost, setShowPost] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Add this line
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );
  const { id } = useParams();
  const [defaultData, setDefaultData] = useState({
    title: "",
    text: "",
    image: []
  });

  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else if (!isError) {
      dispatch(getSinglePost(id));
      dispatch(setPostDetailId(id));
    }

    const timer = setTimeout(() => setShowPost(true), 100);

    return () => {
      dispatch(reset());
      clearTimeout(timer);
    };
  }, [user, dispatch, id, isError]);

  return (
    <>
      <Header activateDrawer={handleDrawer} />
      <Grid container sx={{ height: "100vh", paddingTop: 7 }}>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 3
          }}
        >
          <Box
            className={`${styles.content_active} ${styles.main_content_wrap}`}
            data-testid="main-content-wrap"
          >
            {isLoading ? (
              <Loading />
            ) : (
              showPost &&
              (posts.length !== 0 ? (
                <Newsfeed post={posts[0]} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flexDirection: "column"
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: 3,
                      width: "250px",
                      height: "250px",
                      background: "whitesmoke",
                      borderRadius: "50%",
                      border: "4px solid #fff"
                    }}
                  >
                    <img
                      className="nopost_img"
                      src={process.env.PUBLIC_URL + "/nopost_icon.png"}
                      alt="rOne"
                    />
                  </Box>
                  <Typography sx={{ color: "#565252" }} className="title_txt">
                    The post you are finding does not exist
                  </Typography>
                </Box>
              ))
            )}
          </Box>
          <Box
            className={`${
              isClicked ? styles.drawer_active : styles.drawer_hidden
            } ${styles.drawer_wrapper}`}
            data-testid="drawer-wrapper"
          >
            <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default SinglePost;
