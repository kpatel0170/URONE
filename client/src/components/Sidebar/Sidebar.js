import React from 'react';
import {useState} from 'react';
import styles from "./Sidebar.module.css";
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = props => {    

    return(
        <>
            <Box sx={{ position: 'fixed', width: 1/4, borderLeft: 1, borderColor: '#dedede', height: '100%', p: 2}}>               
                <Button variant="contained" sx={{p:1, borderRadius: '25px', width: 1, mt: 3, bgcolor: '#0e69d6', boxShadow: 0}} type="submit">
                    {/* <svg height="32px" width="32px" viewBox="0 0 32 32"><g id="Guides__x26__Forms"/><g id="Icons"><polygon fill="white" points="25,15 17,15 17,7 15,7 15,15 7,15 7,17 15,17 15,25 17,25 17,17 25,17  "/></g></svg> */}
                    <AddIcon />
                    <Typography sx={{ml: 1}}>Create</Typography>
                </Button>
            </Box>
        </>
    )
}
export default Sidebar;