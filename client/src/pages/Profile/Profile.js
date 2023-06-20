import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectNavigation } from '../../features/Nav/NavSlice';
import { toast, Slide } from 'react-toastify';

import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { updateSingleUser, setUser, reset } from "../../features/User/UserSlice";
import { openDrawer, closeDrawer } from '../../features/Home/HomeSlice';

import Header from "../../components/Header/Header";
import PostForm from '../../components/Post/PostForm';
import Loading from '../../components/Loading/Loading';

import styles from "../Home/Home.module.css";


const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const { isUserLoading, isUserSuccess } = useSelector((state) => state.users)
  const [isEdit, setIsEdit] = useState(false);
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    about: "",
    userType: "",
  });
  const { name, email, profilePicture, about, userType } = formData;
  const [base64Images, setBase64Images] = useState(formData.profilePicture); 
  const [defaultData, setDefaultData] = useState({
      title: '',
      text: '', 
      image: []
  });

  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

  const formInputHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setIsEdit(false);
    // Perform save operation with updated data
    console.log("Saving data:", formData);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prevState) => ({
        ...prevState,
        profilePicture: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const base64Handler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setBase64Images(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }else{
      console.log(user)
      setFormData({
        name: user.data.name,
        email: user.data.email,
        profilePicture: user.data.profilePicture,
        about: user.data.about,
        userType: user.data.type,
      })

      setBase64Images(user.data.profilePicture)
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate])

  useEffect(() => {
    console.log('render drawer check from home ... ', isDrawerOpen)
    if(isDrawerOpen === true){
    setIsClicked(true);
    }else{
    setIsClicked(false);
    }
}, [isDrawerOpen])

  // update the profile
  const profileUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formData)
    console.log(user.data._id)    

    const data = {
      name: formData.name,
      email: formData.email,
      profilePicture: base64Images,
      about: formData.about,
    }
    console.log(data)
        
    dispatch(updateSingleUser({ userData: data, userId: user.data._id }));
    
    
    // toast.success('Profile updated successfully', { position: "bottom-right", hideProgressBar: true, autoClose: 1500, transition:Slide});
  }

  const goToUserPage = (userData) => { 
    dispatch(setUser(userData)) // trigger the current post user's credential   
    navigate(`/${name}`)
    dispatch(selectNavigation(''));
    dispatch(closeDrawer())
  }

  return (
    <>
      <Header />
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={12} sx={{width: '100%', padding: 2, paddingY: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Grid sx={{ width: '65%', background: '#fff', borderRadius: '25px', paddingX: 5, paddingY: 5}} className={isClicked ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
            <Box onClick={() => goToUserPage(user.data)} sx={{display: 'flex'}}>
              <ChevronLeftIcon className="context_link" /> 
              <Typography className="context_link" sx={{fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)', cursor: 'pointer'}}>Account</Typography>
            </Box>
            <Typography sx={{ marginBottom: 4}} className="title_txt">Profile Setting</Typography>
            {isUserLoading ? <Loading /> : <> 
              <Box sx={{paddingX: 5}}>
                <Grid item xs={12} sx={{display: 'flex'}}>
                  <Grid item xs={5}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        overflow: "hidden",
                        position: "relative",
                        background: '#282424',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {base64Images.length === 0 ? (
                        <Box sx={{color: "#85868f",}}>
                            <PersonOutlineIcon sx={{fontSize: '2.5rem', opacity: '0.7'}} />
                        </Box>
                      ) : (
                        <img className="profile_img" src={base64Images} alt="Profile" />
                      )}
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      <label htmlFor="upload-button">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ textTransform: "none", border: 1, borderColor: '#dedede' }}
                        >
                          <PhotoCameraIcon sx={{paddingRight: 1}} />
                          Upload
                        </Button>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="upload-button"
                        onChange={base64Handler}
                      />
                    </Box>
                    
                  </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Box>
                      <form onSubmit={profileUpdateHandler}>
                        <Box mb={2}>
                          <Typography variant="subtitle1" fontWeight="600">
                            Name
                          </Typography>
                          
                            <TextField
                              id="name"
                              name="name"
                              type="text"
                              onChange={formInputHandler}
                              value={name}
                              placeholder="Enter name"
                              fullWidth
                              variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                          <Typography variant="subtitle1" fontWeight="600">
                            Email
                          </Typography>
                          
                            <TextField
                              id="email"
                              name="email"
                              type="email"
                              onChange={formInputHandler}
                              value={email}
                              placeholder="Enter email"
                              fullWidth
                              variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                          <Typography variant="subtitle1" fontWeight="600">
                            Bio
                          </Typography>
                          
                            <TextField
                              id="about"
                              name="about"
                              type="text"
                              onChange={formInputHandler}
                              value={about}
                              placeholder="Enter bio"
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                            />
                          
                        </Box>
                        <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                          <Button type="button" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                          <Button
                            type="submit"
                            variant="contained"
                            onClick={isEdit ? handleSave : handleEdit}
                            startIcon={<SaveIcon />}
                            sx={{p:1, width: '48%', boxShadow: 'none'}}
                          >
                            Save
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              </>}
          </Grid>
          <>
              <Box className={styles.drawer_container}>
              <Box className={isClicked ? `${styles.drawer_active} ${styles.drawer_wrapper}` : `${styles.drawer_hidden} ${styles.drawer_wrapper}`}>
                  <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
              </Box>
              </Box>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
