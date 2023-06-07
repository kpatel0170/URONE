import React, { useState} from 'react';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, reset } from '../../features/Auth/AuthSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Avatar, Grid, Menu, MenuItem, Box, Button, Typography } from '@mui/material';

const Header = props => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth)

    const [toggle, setToggle] = useState(null);
    const isToggle = Boolean(toggle);

    const enableToggleHandler = (event) => {
        setToggle(event.currentTarget);
    };

    const hideToggleHandler = (event) => {
        if(event.target.innerText === 'Logout'){
            console.log('dispatch logout ...')
            dispatch(logOut());
            dispatch(reset())
            navigate('/')
        }else if(event.target.innerText === 'Profile'){
            navigate('/profile')
        }
        setToggle(null);
    };
     
    return(
        <React.Fragment>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={3}>
                    <Box sx={{width: '50px', height: '50px', borderRadius: '50%', background: '#1976d2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography sx={{color:'white', fontWeight: 'bold'}}>rOne</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {/* <Search /> */}
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button onClick={enableToggleHandler} sx={{background: 'transparent', color: '#9a9595'}}>
                        <Avatar sx={{border: 2, borderColor: '#1473E6'}} alt="Remy Sharp" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />                                
                        <Typography sx={{paddingX: 1}}>{user.data.name}</Typography>
                        <Box>
                            <MoreVertIcon />
                        </Box>
                    </Button>

                    <Menu
                        id="profile-menu"
                        anchorEl={toggle}
                        open={isToggle}
                        onClose={hideToggleHandler}
                        MenuListProps={{
                        'aria-labelledby': 'profile-button',
                        }}
                        
                    >
                        <MenuItem onClick={hideToggleHandler} sx={{ width: '250px'}}>Profile</MenuItem>
                        <MenuItem onClick={hideToggleHandler} sx={{ width: '250px'}}>Logout</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default Header;