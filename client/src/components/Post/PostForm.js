import react, { useState } from 'react';
import { Button, Typography, Box, TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../features/Post/PostSlice';
import styles from './PostForm.module.css';
import '../../App.css';

export default function PostForm() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    // initialize values
    const [formData, setFormData] = useState({
        text: '',
        image: [],
        likes: false,
        dislikes: false,
        comments: false,
        share: false,
        checkAll: false
    });
    const {text, image, likes, dislikes, comments, share, checkAll} = formData;    
    const [previewImages, setPreviewImages] = useState([]);
    const [fileName, setFileName] = useState('');

    const formInputHandler = (event) => {
        let {name, checked} = event.target;        

        if (name === 'checkAll') {
            console.log('in the if')
            setFormData((prevState) => ({
                ...prevState,
                likes: checked,
                dislikes: checked,
                comments: checked,
                share: checked,
                [event.target.name]: event.target.checked
            }));
        } else if(name === 'text'){
            setFormData((prevState) => ({
                ...prevState, 
                [event.target.name]: event.target.value,
            }));
        } else {
            console.log('in the else')
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked
            }));
        }
    };

    const filesUploadHandler = (event) => {
        console.log(event.target.files)
        const uploadedImage = Array.prototype.slice.call(event.target.files);
        // const uploadedImage = event.target.files;
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...uploadedImage]
        }));

        setFileName(event.target.files[0])



        if(event.target.files){
            const files = Array.from(event.target.files).map((file)=> URL.createObjectURL(file))
            console.log(files)
            setPreviewImages((prev) => prev.concat(files));
            Array.from(event.target.files).map(
                (file)=>URL.revokeObjectURL(file)
            )
        }
    }

    const renderImagePreview = (data) => {
        return data.map((previewImage, index) => {
            return (
                <Box key={index} sx={{width: 0.5/3, padding: 1, border: 1, borderRadius: 2, borderColor: '#dcdcdc', marginX: 1, marginBottom: 1, background: 'white'}}>
                    <img src={previewImage} className={styles.preview_img_wrap} />
                </Box>
            )
        })
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        const userId = user.data._id;
        const data = new FormData();
        data.append('text', text)
        data.append('image', image)
        data.append('userId', userId)

        // data.append('image', image)

        console.log(data.get('text'))
        for (let [key, value] of data) {
            console.log(`${key}: ${value}`);
        }

        const formData = {
            text,
            image,
            userId
        }

        console.log(formData)

        dispatch(createPost(formData))

        setFormData({
            text: '',
            image: [],
            likes: false,
            dislikes: false,
            comments: false,
            share: false,
            checkAll: false
        })
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: '#dcdcdc', marginBottom: 3, paddingBottom: 2}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                    Create Post
                </Typography>
            </Box>
            <form onSubmit={submitFormHandler}>                
                <TextField
                    id="text"
                    name="text"
                    onChange={formInputHandler}
                    value={text}
                    label="What's up ..."
                    multiline
                    rows={4}
                    sx={{width:1}}
                    />
                <Box sx={{marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <input 
                        id="file"
                        name="file"
                        type='file'
                        accept="image/png, image/jpeg"
                        onChange={filesUploadHandler}
                        multiple
                        sx={{display: 'none'}}
                    />
                    <Box>
                        <label htmlFor="file" className="image_upload_label">
                            <PhotoLibraryIcon /> 
                            <Typography sx={{paddingLeft: 1}} variant='caption'>Upload Images</Typography>
                        </label>
                    </Box>

                    {previewImages.length != 0 && 
                        <Box className={styles.image_count}>
                            <Typography variant='subtitle2'>{previewImages.length}</Typography>
                        </Box>
                    }
                </Box>
                {previewImages.length != 0 &&
                    <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: 2, background: '#f7f7f7', border: '1px dashed #dcdcdc', borderRadius: '10px', padding: 2}} className={styles.preview_container}>
                        {renderImagePreview(previewImages)}
                    </Box>
                }
                
                
                {/* <IconButton>
                    <PhotoLibraryIcon />
                </IconButton> */}
                
                {/* <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: '#dcdcdc', marginTop: 3, marginBottom: 3, paddingBottom: 2, paddingTop: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold', marginBottom: 2}}>Manage Post</Typography>                        
                        <FormControlLabel
                            control={
                                <Switch checked={formData.checkAll} onChange={formInputHandler} name="checkAll" />
                            }
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 2, paddingLeft: 2}}>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.likes} onChange={formInputHandler} name="up" />
                                }
                            />
                            <ThumbUpOffAltIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.dislikes} onChange={formInputHandler} name="down" />
                                }
                            />
                            <ThumbDownOffAltIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.comments} onChange={formInputHandler} name="comment" />
                                }
                            />
                            <ChatBubbleOutlineIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.share} onChange={formInputHandler} name="share" />
                                }
                            />
                            <ShareIcon />
                        </Box>
                    </Box>
                </Box> */}
                <Box sx={{ marginY: 3, display: 'flex', justifyContent: 'space-between', borderTop: 1, borderColor: '#dedede', paddingTop: 3}}>
                    <Button type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                    <Button type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Post</Button>
                </Box>
            </form>
        </>
    )
}