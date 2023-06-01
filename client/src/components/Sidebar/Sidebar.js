import React from 'react';
import {useState} from 'react';
import styles from "./Sidebar.module.css";
import { Button, Typography, Box } from '@mui/material';

const Sidebar = props => {    

    return(
        <Box className={ " h-screen border-solid border-l md: px-3 lg:px-6 py-4 md:w-24 lg:w-80 bg-white fixed right-0 overflow-y-auto hidden lg:block mb-10 transition duration-100 ease-in-out"}>               
            <Button variant="contained" sx={{p:1, borderRadius: '25px', width: 1, mt: 3, bgcolor: '#0e69d6', boxShadow: 0}} type="submit">
                <svg height="32px" width="32px" viewBox="0 0 32 32"><g id="Guides__x26__Forms"/><g id="Icons"><polygon fill="white" points="25,15 17,15 17,7 15,7 15,15 7,15 7,17 15,17 15,25 17,25 17,17 25,17  "/></g></svg>
                <Typography sx={{ml: 2}}>Create</Typography>
            </Button>
        </Box>
    )
}
export default Sidebar;