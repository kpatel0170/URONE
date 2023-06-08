import React from 'react';
import {useState} from 'react';
import styles from "./Sidebar.module.css";
import { Button, Typography, Box, Modal, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import PostForm from '../Post/PostForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '38%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};

const Sidebar = props => { 
    const [modal, setModal] = useState(false)
    const modalOpenHandler = () => setModal(true);
    const modalCloseHandler = () => setModal(false);   

    return(
        <>
            <Box sx={{ position: 'fixed', width: 1/4, borderLeft: 1, borderColor: '#dedede', height: '100%'}}> 
                <Box sx={{p: 2}}>             
                    <Button 
                        variant="contained" 
                        sx={{
                            p:1, 
                            borderRadius: 
                            '25px',  
                            mt: 3, 
                            width: 1,
                            bgcolor: '#0e69d6', 
                            boxShadow: 0}} 
                            type="submit"
                            onClick={modalOpenHandler}
                            >                    
                        <AddIcon />
                        <Typography sx={{ml: 1}}>Create</Typography>
                    </Button>
                </Box> 
            </Box>

            <Modal
                open={modal}
                onClose={modalCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='styles.backdrop_wrap'
            >
                <Box sx={style}>
                    <Box sx={{position: 'absolute', right: '10px', top: '10px'}}>
                        <IconButton aria-label="close" onClick={modalCloseHandler}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <PostForm/>
                </Box>
            </Modal>
        </>
    )
}
export default Sidebar;