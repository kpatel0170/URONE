import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/Header/Header";
import Newsfeed from "../../components/Newsfeed/Newsfeed";
import PostForm from "../../components/Post/PostForm";
import styles from "../Home/Home.module.css";

import { getAllPosts, reset } from "../../features/Post/PostSlice";
import { getSingleUser } from "../../features/User/UserSlice";
import Loading from "../../components/Loading/Loading";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPost, setShowPost] = useState(false);
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
  const [isClicked, setIsClicked] = useState(false);
  const currentUser = useSelector((state) => state.users.singleUser);
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );
  const [defaultData, setDefaultData] = useState({
    title: "",
    text: "",
    image: []
  });

  let typographyColor;
  switch (currentUser.type) {
    case "student":
      typographyColor = "#f7c602";
      break;
    case "professor":
      typographyColor = "#0aade2";
      break;
    case "staff":
      typographyColor = "#634db7";
      break;
    case "other":
      typographyColor = "black";
      break;
    default:
      typographyColor = "black";
  }

  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

  useEffect(() => {
    if (isDrawerOpen === true) {
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
    } else {
      if (!isError) {
        dispatch(getAllPosts({ type: "userId", value: currentUser._id }));
        dispatch(getSingleUser(currentUser._id));
      }
    }

    setShowPost(true);

    return () => {
      dispatch(reset());
    };
  }, [user]);

  const goToProfile = () => {
    navigate("/profile");
  };

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
            sx={{ width: "570px" }}
            className={`${
              isClicked
                ? `${styles.content_active} ${styles.main_content_wrap}`
                : styles.main_content_wrap
            }`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {showPost && (
                  <>
                    {currentUser.profilePicture != undefined && (
                      <Box sx={{ marginY: 4 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Box>
                            {currentUser.profilePicture.length === 0 ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginBottom: 3,
                                  width: "150px",
                                  height: "150px",
                                  background: "#282424",
                                  borderRadius: "50%",
                                  border: "6px solid #fff"
                                }}
                              >
                                <Box
                                  sx={{
                                    color: "#85868f",
                                    boxShadow:
                                      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
                                  }}
                                >
                                  <PersonOutlineIcon
                                    sx={{ fontSize: "2.5rem", opacity: "0.7" }}
                                  />
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  boxShadow:
                                    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                                  marginBottom: 3,
                                  width: "150px",
                                  height: "150px",
                                  background: "whitesmoke",
                                  borderRadius: "50%",
                                  border: "6px solid #fff"
                                }}
                              >
                                <img
                                  src={currentUser.profilePicture}
                                  className="nopost_img"
                                  alt="profile"
                                />
                              </Box>
                            )}
                          </Box>
                          <>
                            {currentUser._id === user.data._id && (
                              <Box>
                                <Box
                                  onClick={goToProfile}
                                  sx={{
                                    boxShadow:
                                      "1px 2px 5px 0px rgb(232 232 232 / 91%)",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    padding: "10px",
                                    background: "#fff",
                                    borderRadius: "25px"
                                  }}
                                  className="context_link"
                                >
                                  <ModeEditOutlineIcon
                                    sx={{ fontSize: "1rem", paddingRight: 1 }}
                                  />
                                  <Typography
                                    className="context_link"
                                    sx={{
                                      fontSize: "0.875rem",
                                      color: "rgba(0, 0, 0, 0.6)"
                                    }}
                                  >
                                    Edit Profile
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </>
                        </Box>
                        {currentUser.about.length !== 0 && (
                          <Box sx={{ display: "flex", marginBottom: 2 }}>
                            <HistoryEduIcon />
                            <Typography
                              sx={{
                                paddingLeft: 1,
                                fontSize: "0.875rem",
                                lineHeight: "1.3",
                                color: "rgba(0, 0, 0, 0.6)"
                              }}
                            >
                              {currentUser.about}
                            </Typography>
                          </Box>
                        )}
                        {!isLoading && currentUser._id !== undefined && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              sx={{ paddingRight: 1, color: "#939393" }}
                            >
                              Posts:
                            </Typography>
                            <Typography sx={{ color: "#333" }}>
                              {posts.length}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                    {posts.length !== 0 ? (
                      <>
                        {posts
                          .slice()
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )
                          .map((post, index) => (
                            <Box key={index}>
                              <Newsfeed post={post} />
                            </Box>
                          ))}
                      </>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column"
                        }}
                      >
                        <Typography
                          sx={{ color: "#565252" }}
                          className="title_txt"
                        >
                          No post yet.
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
          <Box className={styles.drawer_container}>
            <Box
              className={`${
                isClicked
                  ? `${styles.drawer_active} ${styles.drawer_wrapper}`
                  : `${styles.drawer_hidden} ${styles.drawer_wrapper}`
              }`}
            >
              <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default User;
