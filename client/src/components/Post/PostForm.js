import react, { useState } from 'react';
import { Button, Typography, Box, TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../features/Post/PostSlice';
import styles from './PostForm.module.css';
import '../../App.css';
import { toast } from 'react-toastify';

export default function PostForm(props) {
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
    const isEmpty = formData.text.trim().length === 0;
    const {text, image, likes, dislikes, comments, share, checkAll} = formData;    
    const [previewImages, setPreviewImages] = useState([]); 
    // const [currentData, setCurrentData] = useState(data);
    
    // console.log(props)

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
        // const uploadedImage = Array.prototype.slice.call(event.target.files);
        const uploadedImage = event.target.files;
        console.log('...image', formData.image)

        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...prevFormData.image,...uploadedImage], 
        }));

        console.log('...AFimage', formData.image)

        if(event.target.files){
            const files = Array.from(event.target.files).map((file)=> URL.createObjectURL(file))
            console.log(files)
            setPreviewImages((prev) => prev.concat(files));
            Array.from(event.target.files).map(
                (file)=>URL.revokeObjectURL(file)
            )
        }
    }

    const removeImage = (index) => {
        console.log(index)
        const filteredImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(filteredImages);

        const filteredFormImage = formData.image.filter((_, i) => i !== index);

        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...filteredFormImage]
        }));
    }

    const renderImagePreview = (data) => {
        return data.map((previewImage, index) => {
            return (
                <Box key={index} sx={{position: 'relative', width: 0.5/2, padding: 1, border: 1, borderRadius: 2, borderColor: '#dcdcdc', marginX: 1, marginBottom: 1, background: 'white'}}>                       
                    <IconButton onClick={() => removeImage(index)} sx={{width: '20px', height: '20px', background: '#dfe2eb', position: 'absolute', right: '4px', top: '4px'}}>
                        <CloseIcon sx={{width: '19px'}} />
                    </IconButton>
                    <img src={previewImage} className={styles.preview_img_wrap} />
                </Box>
            )
        })
    }

    const clearAllImages = (event) => {
        setPreviewImages([]);
        let emptyArray = [];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...emptyArray]
        }));
    }

    const modalHandler = (event) => {
        props.onModalClose(true);
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        const userId = user.data._id;
        const data = new FormData();
        data.append('text', text)
        data.append('userId', userId)

        for (let i of image) {
            data.append('image', i);
        }

        const formData = {
            text,
            image,
            userId
        }

        console.log(formData)
        console.log(image)
        
        dispatch(createPost(data))

        setFormData({
            text: '',
            image: [],
            likes: false,
            dislikes: false,
            comments: false,
            share: false,
            checkAll: false
        })
        toast.success('Post created successfully', {position: 'top-center'});
        props.onModalClose(true);
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
                    label="Share your thought ..."
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
                        <Box sx={{width: '100%'}}>
                            <Button onClick={clearAllImages} variant="outlined" sx={{float: 'right'}}>Clear All</Button>
                        </Box>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>                        
                            {renderImagePreview(previewImages)}
                        </Box>
                    </Box>
                }
                
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
                    <Button onClick={modalHandler} type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                    <Button disabled={isEmpty && formData.image.length === 0} type="submit" variant="contained" sx={{p:1, width: '48%', boxShadow: 'none'}}>Post</Button>
                </Box>
            </form>
        </>
    )
}
