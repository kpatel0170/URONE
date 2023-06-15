import React, { useState } from "react";
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

import Header from "../../components/Header/Header";

const Profile = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
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

  return (
    <>
      <Header />
      <Grid container spacing={2} alignItems="center" sx={{ paddingTop: 10, paddingLeft: 5 }}>
        <Grid item xs={2} sm={2}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {profilePicture ? (
                <Avatar
                  sx={{ width: "100%", height: "100%" }}
                  src={profilePicture}
                  alt="Profile"
                />
              ) : (
                <Avatar sx={{ width: "100%", height: "100%" }} alt="Profile">
                  {name && name.length > 0 ? name.charAt(0).toUpperCase() : ""}
                </Avatar>
              )}
            </Box>
            {isEdit && (
              <Box sx={{ marginTop: 1 }}>
                <label htmlFor="upload-button">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{ textTransform: "none" }}
                  >
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
            )}
          </Box>
        </Grid>

        <Grid item xs={2} sm={7}>
          <Typography variant="h5" gutterBottom>
            Edit Profile
          </Typography>
          <form>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="600">
                Name
              </Typography>
              {isEdit ? (
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
              ) : (
                <Typography variant="body1">{name}</Typography>
              )}
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="600">
                Email
              </Typography>
              {isEdit ? (
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
              ) : (
                <Typography variant="body1">{email}</Typography>
              )}
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="600">
                Bio
              </Typography>
              {isEdit ? (
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
              ) : (
                <Typography variant="body1">{bio}</Typography>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={isEdit ? handleSave : handleEdit}
              startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
              sx={{ mt: 2 }}
            >
              {isEdit ? "Save" : "Edit"}
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
