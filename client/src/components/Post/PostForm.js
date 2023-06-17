import react, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { createPost, updateSinglePost, restSelectPost } from '../../features/Post/PostSlice';
import { toggleDrawer, closeDrawer } from '../../features/Home/HomeSlice';
import styles from './PostForm.module.css';
import '../../App.css';
import { toast } from 'react-toastify';

export default function PostForm(props) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const selectedPost = useSelector((state) => state.post.selectedPost);
    const baseUrl = "http://localhost:3001/posts/";

    const [formData, setFormData] = useState(selectedPost || { title: '', text: '', image: [] });
    
    const isEmpty = formData.text.trim().length === 0;
    const {title, text, image} = formData;    
    const [previewImages, setPreviewImages] = useState(formData.image);
    const [base64Images, setBase64Images] = useState(formData.image);         

    useEffect(() => {
        if(selectedPost != null){
            setFormData(selectedPost)
            setBase64Images(selectedPost.image)
            console.log(base64Images)
        }
    }, [selectedPost])
    
    //start:: input form fields
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
        } else if(name === 'title'){
            setFormData((prevState) => ({
                ...prevState, 
                [event.target.name]: event.target.value,
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
    //end:: input form fields

    //start:: image upload, preview and remove
    const base64Handler = (event) => {
        const files = event.target.files;
        const filePromises = [];

        for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
        filePromises.push(filePromise);
        }

        Promise.all(filePromises).then((results) => {
            setBase64Images((prev) => prev.concat(results));
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: [...prevFormData.image,...results], 
            }));
        });
    }

    const filesUploadHandler = (event) => {
        const uploadedImage = event.target.files;

        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...prevFormData.image,...uploadedImage], 
        }));

        if(event.target.files){
            const files = Array.from(event.target.files).map((file)=> URL.createObjectURL(file))
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

        const filteredBase64 = base64Images.filter((_, i) => i !== index);
        setBase64Images(filteredBase64);

        const filteredFormImage = formData.image.filter((_, i) => i !== index);

        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...filteredFormImage]
        }));
    }

    const renderImagePreview = (data) => {
        return data.map((previewImage, index) => {
            return (
                <Box key={index} sx={{position: 'relative', width: 0.75/3, padding: '4px', border: 1, borderRadius: 2, borderColor: '#dcdcdc', marginX: 1, marginBottom: 1, background: 'white'}}>                       
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
        setBase64Images([]);
        let emptyArray = [];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...emptyArray]
        }));
    }

    //end:: image upload, preview and remove

    //start:: trigger drawer
    const drawerHandler = () => {
        setFormData({
            title: '',
            text: '',
            image: []
        })
        setPreviewImages([])
        setBase64Images([]);
        dispatch(restSelectPost())
        props.deactivtateDrawer(false);
        dispatch(toggleDrawer());
    }

    const cancelDrawerHandler = () => {
        setFormData({
            title: '',
            text: '',
            image: []
        })
        setPreviewImages([])
        setBase64Images([]);
        dispatch(restSelectPost())
        dispatch(closeDrawer());
        props.deactivtateDrawer(false);
    }
    //end:: trigger drawer

    //start:: create/edit post form submit 
    const submitFormHandler = (event) => {
        console.log(base64Images)
        event.preventDefault();
        const userId = user.data._id;
        const data = new FormData();
        data.append('title', title)
        data.append('text', text)
        data.append('userId', userId)
        
        for (let i of image) {
            data.append('image', i);
        }

        let postData = {
            'title': title != undefined ? title : '',
            'text': text,
            'image': base64Images,
            'userId': userId
        }
        
        if(!selectedPost) {
            dispatch(createPost(postData))
        }else{
            dispatch(updateSinglePost({ postData: postData, postId: selectedPost._id }));
            dispatch(restSelectPost())
        }
        setFormData({
            title: '',
            text: '',
            image: []
        })
        // toast.success('Post created successfully', {position: 'top-center'});
        props.deactivtateDrawer(false);
        setPreviewImages([]);
        setBase64Images([]);
    }
    //end:: create/edit post form submit 

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: '#dcdcdc', paddingBottom: 2, paddingTop: '26px', position: 'fixed', width: '330px', zIndex: 1, background: '#fff'}}>
                {!selectedPost ? (<Typography id="modal-modal-title" variant="h6" component="h2">
                    Create Post
                </Typography>) : (
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Post
                    </Typography>
                )}
                
                <Box sx={{ position: "absolute", right: "20px", top: "20px" }}>
                    <IconButton aria-label="close" onClick={cancelDrawerHandler} sx={{background: '#f2f2f2'}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
            <form onSubmit={submitFormHandler}>
                <Box sx={{height: '100vh', paddingBottom: '50px', marginTop: '6rem'}}>
                    <Box sx={{marginBottom: 4}}>
                        <Typography sx={{ mb: 1 }}>Title</Typography>
                        <TextField
                            id="title"
                            name="title"
                            type="text"
                            onChange={formInputHandler}
                            value={formData.title}
                            placeholder="Enter title"
                            sx={{ width: 1 }}
                        />
                    </Box>             
                    <TextField
                        id="text"
                        name="text"
                        onChange={formInputHandler}
                        value={formData.text}
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
                            onChange={base64Handler}
                            multiple
                            sx={{display: 'none'}}
                        />
                        <Box sx={{minHeight: '37px'}}>
                            <label htmlFor="file" className="image_upload_label">
                                <PhotoLibraryIcon /> 
                                <Typography sx={{paddingLeft: 1}} variant='caption'>Upload Images</Typography>
                            </label>
                        </Box>
                        {base64Images.length != 0 && 
                            <Box className={styles.image_count}>
                                <Typography variant='subtitle2'>{base64Images.length}</Typography>
                            </Box>
                        }
                    </Box>
                    {/* <Box sx={{marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
                    </Box> */}

                    
                    {previewImages.length != 0 &&
                        <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: 2, background: '#f7f7f7', border: '1px dashed #dcdcdc', borderRadius: '10px', padding: 2}} className={styles.preview_container}>
                            <Box sx={{width: '100%', margin: '5px'}}>
                                <Button onClick={clearAllImages} variant="outlined" sx={{float: 'right', margin: '5px'}}>Clear All</Button>
                            </Box>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>                        
                                {renderImagePreview(previewImages)}
                            </Box>
                        </Box>
                    }

                    {base64Images.length != 0 &&
                        <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: 2, background: '#f7f7f7', border: '1px dashed #dcdcdc', borderRadius: '10px'}} className={styles.preview_container}>
                            <Box sx={{width: '100%', margin: '5px'}}>
                                <Button onClick={clearAllImages} variant="outlined" sx={{float: 'right'}}>Clear All</Button>
                            </Box>
                            <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>                        
                                {renderImagePreview(base64Images)}
                            </Box>
                        </Box>
                    }
                </Box>   


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
                <Box sx={{position: 'fixed', bottom: 0, width: '330px', background: 'white'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: 1, borderColor: '#dedede', paddingY: 3}}>
                        <Button onClick={cancelDrawerHandler} variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                        {!selectedPost ? (
                            <Button disabled={isEmpty && formData.image.length === 0} type="submit" variant="contained" sx={{p:1, width: '48%', boxShadow: 'none'}}>Post</Button>
                        ) : (
                            <Button disabled={isEmpty && formData.image.length === 0} type="submit" variant="contained" sx={{p:1, width: '48%', boxShadow: 'none'}}>Edit</Button>
                        ) }
                    </Box>
                </Box>
            </form>
        </>
    )
}
