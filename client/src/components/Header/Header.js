import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, reset } from '../../features/Auth/AuthSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import {Avatar, Grid, Menu, MenuItem, Box, Button, Typography, ListItem, ListItemButton, ListItemText} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import { getAllPosts } from '../../features/Post/PostSlice';


const Header = props => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth)

    // const [menuVisible, setMenuVisible] = useState(false);

    const [toggle, setToggle] = useState(null);
    const isToggle = Boolean(toggle);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // const enableToggleHandler = (event) => {
    //     setToggle(event.currentTarget);
    // };

    const backToHome = (event) => {
        navigate('/')
    }

    const renderPosts = (value) => {
        let param = {type: 'user', value: value}
        dispatch(getAllPosts(param))
    }

    const createPostHandler = () => {
        console.log('active the drawer')
        props.activateDrawer(true)
    }

    const toggleDropdown = () =>{
        setDropdown(!dropdown)
    }

    const handleOutsideClick = (event) => {
        setDropdown(false);
        if (dropdownRef.current) {
            if(dropdown === true){
                setDropdown(false);
            }else{
                dropdownRef.current = null
                setDropdown(true);
            }
        }else{
            setDropdown(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {            
            handleOutsideClick(event);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const hideToggleHandler = (event) => {
        if(event.target.innerText === 'Logout'){
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
            <Box sx={{position: 'fixed', width: '100%', zIndex: '2'}}>
                <Box className="header_wrap">
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item xs={4} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography onClick={backToHome} sx={{cursor: 'pointer', color:'#1976d2', fontWeight: 'bold', fontSize: '3rem', lineHeight: 1}}>rOne</Typography>
                            <Box sx={{marginLeft: '3.5rem'}}>
                                <Button onClick={createPostHandler} sx={{borderRadius: '25px', textTransform: 'capitalize', color: '#4d4d4d', border: 1, borderColor: '#dcdcdc', marginRight: 2, paddingRight: '0.8rem', background: '#f7f7f7'}}><AddIcon sx={{color: '#1a76d2'}} />create</Button>
                                <Button sx={{borderRadius: '25px', textTransform: 'capitalize', color: '#4d4d4d', border: 1, borderColor: '#dcdcdc', paddingRight: '0.8rem', background: '#f7f7f7'}}><LoopIcon sx={{color: '#1a76d2'}}/>refresh</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={5} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Box sx={{display: 'flex'}}>
                                <Button onClick={() => renderPosts('all')} sx={{textTransform: 'capitalize', color: '#4d4d4d', borderRadius: 0, padding: '0 8px', minWidth: 'auto', marginRight: '30px'}}>All</Button>
                                <Button onClick={() => renderPosts('professor')} sx={{textTransform: 'capitalize', color: '#4d4d4d',  borderRadius: 0, padding: '0 8px', minWidth: 'auto', marginRight: '30px'}}>Academic</Button>
                                <Button onClick={() => renderPosts('staff')} sx={{textTransform: 'capitalize', color: '#4d4d4d',  borderRadius: 0, padding: '0 8px', minWidth: 'auto', marginRight: '30px'}}>Announcement</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>                            
                            <Button onClick={toggleDropdown} sx={{background: 'transparent', color: '#9a9595', textTransform: 'none'}}>
                                {user?.data.profilePicture.length != 0 ?                                     
                                    (
                                        <Avatar sx={{border: 2, borderColor: '#1473E6'}} alt="profile" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                                    ) :
                                    (   <>
                                            <Box sx={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 2, borderColor: '#1473E6', background: '#e6e7ee'}}>
                                                <PersonOutlineIcon />
                                            </Box>
                                        </>
                                    )
                                }
                                <Typography sx={{paddingX: 1}}>{user?.data.name}</Typography>
                                <Box>
                                    <MoreVertIcon />
                                </Box>
                            </Button>
                            {dropdown && 
                                <Box ref={dropdownRef} sx={{position: 'absolute', top: '70px', background: 'white', width: '250px', border: 1, borderColor: 'rgb(230, 230, 230)', borderRadius: '5px', padding: '5px', boxShadow: 'rgb(230, 230, 230) 0px 1px 4px'}}>                                    
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText sx={{fontSize: '16px', color: 'rgba(117, 117, 117, 1)'}} onClick={toggleDropdown} primary="Logout" />
                                        </ListItemButton>
                                    </ListItem>
                                </Box>
                            }

                            <Menu
                                id="profile-menu"
                                anchorEl={toggle}
                                open={isToggle}
                                onClose={hideToggleHandler}
                                MenuListProps={{
                                'aria-labelledby': 'profile-button',
                                }}
                                disableScrollLock={true}
                            >
                                {/* <MenuItem onClick={hideToggleHandler} sx={{ width: '250px'}}>Profile</MenuItem> */}
                                <MenuItem onClick={hideToggleHandler} sx={{ width: '250px'}}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    )
}
export default Header;