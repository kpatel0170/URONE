import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, reset } from "../../features/Auth/AuthSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Grid,
  IconButton,
  Box,
  Button,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { setUser } from "../../features/User/UserSlice";
import { getAllPosts, restSelectPost } from "../../features/Post/PostSlice";
import { openDrawer, closeDrawer } from "../../features/Home/HomeSlice";
import { selectNavigation, resetNavigation } from "../../features/Nav/NavSlice";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const currentURL = location.pathname;

  const dropdownRef = useRef(null);

  const selectedNav = useSelector((state) => state.nav.selectedNav);
  const { user } = useSelector((state) => state.auth);
  const storedCredentials = JSON.parse(localStorage.getItem("user"));
  const credentials = storedCredentials ? storedCredentials.data : {};
  const [dropdown, setDropdown] = useState(false);

  const backToHome = () => {
    navigate("/");
    dispatch(getAllPosts());
    dispatch(restSelectPost());
    dispatch(closeDrawer());
  };

  const renderPosts = (value) => {
    const param = { type: "usertype", value: value };
    dispatch(getAllPosts(param));
    if (currentURL !== "/") {
      navigate("/");
    }
    dispatch(selectNavigation(value));
  };

  const drawerHandler = () => {
    dispatch(restSelectPost());
    dispatch(openDrawer());
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleOutsideClick = (event) => {
    setDropdown(false);
    if (dropdownRef.current) {
      if (dropdown === true) {
        setDropdown(false);
      } else {
        dropdownRef.current = null;
        setDropdown(true);
      }
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      handleOutsideClick(event);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    setDropdown(!dropdown);
    dispatch(logOut());
    dispatch(reset());
    dispatch(closeDrawer());
    navigate("/");
    dispatch(selectNavigation("all"));
  };

  const goToProfile = () => {
    dispatch(closeDrawer());
    navigate("/profile");
    dispatch(selectNavigation(""));
  };

  const goToUserPage = (userData) => {
    dispatch(setUser(userData));
    navigate(`/${userData.name}`);
    dispatch(selectNavigation(""));
    dispatch(closeDrawer());
  };

  return (
    <React.Fragment>
      <Box sx={{ position: "fixed", width: "100%", zIndex: "2" }}>
        <Box className="header_wrap">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                onClick={backToHome}
                sx={{
                  cursor: "pointer",
                  color: "#1976d2",
                  fontWeight: "bold",
                  fontSize: "3rem",
                  lineHeight: 1
                }}
              >
                rOne
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Button
                  style={{
                    borderBottom:
                      selectedNav === "all"
                        ? "2px solid #1a76d2"
                        : "2px solid transparent"
                  }}
                  onClick={() => renderPosts("all")}
                  sx={{
                    textTransform: "capitalize",
                    color: "#4d4d4d",
                    borderRadius: 0,
                    padding: "0 4px",
                    minWidth: "auto",
                    marginRight: "30px"
                  }}
                >
                  All
                </Button>
                <Button
                  style={{
                    borderBottom:
                      selectedNav === "professor"
                        ? "2px solid #1a76d2"
                        : "2px solid transparent"
                  }}
                  onClick={() => renderPosts("professor")}
                  sx={{
                    textTransform: "capitalize",
                    color: "#4d4d4d",
                    borderRadius: 0,
                    padding: "0 4px",
                    minWidth: "auto",
                    marginRight: "30px"
                  }}
                >
                  Academic
                </Button>
                <Button
                  style={{
                    borderBottom:
                      selectedNav === "staff"
                        ? "2px solid #1a76d2"
                        : "2px solid transparent"
                  }}
                  onClick={() => renderPosts("staff")}
                  sx={{
                    textTransform: "capitalize",
                    color: "#4d4d4d",
                    borderRadius: 0,
                    padding: "0 4px",
                    minWidth: "auto",
                    marginRight: "30px"
                  }}
                >
                  Announcement
                </Button>
              </Box>
              <Box sx={{ marginLeft: "3.5rem" }}>
                <Button
                  className="main_btn"
                  onClick={drawerHandler}
                  sx={{
                    borderRadius: "25px",
                    textTransform: "capitalize",
                    color: "#4d4d4d",
                    paddingRight: "0.8rem",
                    background: "#1a76d2",
                    color: "#fff"
                  }}
                >
                  <AddIcon sx={{ color: "#fff" }} />
                  create
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  background: "transparent",
                  color: "#9a9595",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {credentials && credentials.name ? (
                  <Box
                    onClick={() => goToUserPage(credentials)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {credentials.profilePicture.length !== 0 ? (
                      <Avatar
                        sx={{ border: 1, borderColor: "#eee" }}
                        alt="profile"
                        src={credentials.profilePicture}
                      />
                    ) : (
                      <>
                        <Box
                          sx={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            background: "#282424"
                          }}
                        >
                          <PersonOutlineIcon />
                        </Box>
                      </>
                    )}
                    <Typography className="context_link" sx={{ paddingX: 1 }}>
                      {credentials.name}
                    </Typography>
                  </Box>
                ) : (
                  <h1>Welcome!</h1>
                )}
                <Box sx={{ cursor: "pointer" }} onClick={toggleDropdown}>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
              {dropdown && (
                <Box
                  ref={dropdownRef}
                  sx={{
                    position: "absolute",
                    top: "70px",
                    background: "white",
                    width: "250px",
                    border: 1,
                    borderColor: "rgb(230, 230, 230)",
                    borderRadius: "5px",
                    padding: "5px",
                    boxShadow: "rgb(230, 230, 230) 0px 1px 4px"
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon
                        sx={{ minWidth: "auto", paddingRight: "8px" }}
                      >
                        <PersonOutlineIcon sx={{ fontSize: "1.3rem" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontSize: "16px",
                          color: "rgba(117, 117, 117, 1)"
                        }}
                        onClick={goToProfile}
                        primary="Profile"
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon
                        sx={{ minWidth: "auto", paddingRight: "8px" }}
                      >
                        <LogoutIcon sx={{ fontSize: "1.3rem" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontSize: "16px",
                          color: "rgba(117, 117, 117, 1)"
                        }}
                        onClick={logoutHandler}
                        primary="Logout"
                      />
                    </ListItemButton>
                  </ListItem>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default Header;
