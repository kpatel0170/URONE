import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

import Header from '../../components/Header/Header';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Profile = props => {   

    const[isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const {name, email} = formData;

    const formInputHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState, 
            [event.target.name]: event.target.value,
        }));        
    }

    return(
        <>
            <Header />
            <Grid container sx={{height: '100vh', paddingTop: 10}}>
                <Grid item xs={1} sx={{borderRight: 1, borderColor: '#dedede', height: '100%', padding: 4}}>
                    <PermIdentityIcon />
                </Grid>
                <Grid item xs={11} sx={{padding: 4}}>
                    <Typography>Edit profile</Typography>
                    <Grid container>
                        <Grid item xs={4} sx={{padding: 2}}>
                            <Box sx={{width: '100%', border: 1, borderColor: '#dedede', borderRadius: 3, height: '250px', background: 'rgb(214, 216, 231)'}}>

                            </Box>
                        </Grid>
                        <Grid item xs={8} sx={{padding: 2}}>
                            {isEdit ? (
                                <>
                                    <form >
                                        <Box sx={{paddingBottom: 2, display: 'flex', alignItems: 'center'}}>
                                            <Typography variant="h6">Name</Typography>
                                            <Box sx={{width: '50%', marginLeft: 2}}>
                                                <TextField 
                                                    id="name" 
                                                    name="name"
                                                    type="text" 
                                                    onChange={formInputHandler}
                                                    value={name}
                                                    placeholder="Enter username"
                                                    sx={{width:1}}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{paddingBottom: 2, display: 'flex', alignItems: 'center'}}>
                                            <Typography variant="h6">Email</Typography>
                                            <Box sx={{width: '50%', marginLeft: 2}}>
                                                <TextField 
                                                    id="email" 
                                                    name="email"
                                                    type="text" 
                                                    onChange={formInputHandler}
                                                    value={email}
                                                    placeholder="Enter email"
                                                    sx={{width:1}}
                                                />
                                            </Box>
                                        </Box>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <form >
                                        <Box sx={{paddingBottom: 2, display: 'flex', alignItems: 'center'}}>
                                            <Box sx={{width: '15%'}}>
                                                <Typography variant="h6">Name</Typography>
                                            </Box>
                                            <Box sx={{width: '50%', marginLeft: 2}}>
                                                <Typography>User name</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{paddingBottom: 2, display: 'flex', alignItems: 'center'}}>
                                            <Box sx={{width: '15%'}}>
                                                <Typography variant="h6">Email</Typography>
                                            </Box>
                                            <Box sx={{width: '50%', marginLeft: 2}}>
                                                <Typography>User email</Typography>
                                            </Box>
                                        </Box>
                                    </form>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Profile;