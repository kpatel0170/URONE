import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import { updateSingleUser, updateSingleUser1 } from "../../features/User/UserSlice";

import Header from "../../components/Header/Header";

const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
    userType: "",
  });
  const { name, email, profilePicture, bio, userType } = formData;
  
  

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

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }else{
      console.log(user)
      setFormData({
        name: user.data.name,
        email: user.data.email,
        profilePicture: user.data.profilePicture,
        bio: user.data.about,
        userType: user.data.type,
      })
    }
    
    return () => {
      // dispatch(reset())
    }
  }, [user, navigate])

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formData)
    console.log(user.data._id)
    const data = {
      name: formData.name,
      email: formData.email,
      profilePicture: formData.profilePicture,
      bio: formData.about,
      userType: formData.type,
      id: user.data._id
    }
    dispatch(updateSingleUser(data))
  }

  return (
    <>
      <Header />
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={12} sx={{width: '100%', padding: 2, paddingY: 7, display: 'flex', justifyContent: 'center'}}>
          <Grid item xs={8} sx={{background: '#fff', borderRadius: '25px', paddingX: 5, paddingY: 5}}>
            {/* <Box sx={{display: 'flex', cursor: 'pointer', marginBottom: 3}}>
              <ChevronLeftIcon sx={{ color: 'rgba(0, 0, 0, 0.6)'}} className="context_link" />
              <Typography sx={{fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)'}} className="context_link">Account</Typography>
            </Box> */}
            <Typography sx={{ marginBottom: 4}} className="title_txt">Profile Setting</Typography>
            <Box sx={{paddingX: 5}}>
              {/* <Typography sx={{fontSize: '1.2rem', marginBottom: 3}} className="title_txt">Profile Setting</Typography> */}
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
                    {user.data.profilePicture.length === 0 ? (
                      <Box sx={{color: "#85868f",}}>
                          <PersonOutlineIcon sx={{fontSize: '2.5rem', opacity: '0.7'}} />
                      </Box>
                    ) : (
                      <img className="nopost_img" src={user.data.profilePicture} alt="Profile" />
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
                      onChange={handleProfilePictureChange}
                    />
                  </Box>
                  
                </Box>
                </Grid>
                <Grid item xs={7}>
                  <Box>
                    {/* <Typography variant="h5" gutterBottom sx={{marginBottom: 1}}> Edit Profile </Typography> */}
                    <form onSubmit={formSubmitHandler}>
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
                            id="bio"
                            name="bio"
                            type="text"
                            onChange={formInputHandler}
                            value={bio}
                            placeholder="Enter bio"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                        
                      </Box>
                      <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={isEdit ? handleSave : handleEdit}
                          startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
                          sx={{p:1, width: '48%', boxShadow: 'none'}}
                        >
                          {isEdit ? "Save" : "Edit"}
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
