import react, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { createPost, updateSinglePost, restSelectPost } from '../../features/Post/PostSlice';
import styles from './PostForm.module.css';
import '../../App.css';
import { toast } from 'react-toastify';

// async function convertImageUrlToFile(imageUrl, fileName, fileType) {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     const file = new File([blob], fileName, { type: fileType });
//     return file;
// }

export default function PostForm(props) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const selectedPost = useSelector((state) => state.post.selectedPost);
    const baseUrl = "http://localhost:3001/posts/";

    const [formData, setFormData] = useState(selectedPost || { title: '', text: '', image: [] });
    console.log(selectedPost)
    
    const isEmpty = formData.text.trim().length === 0;
    const {title, text, image} = formData;    
    const [previewImages, setPreviewImages] = useState(formData.image);
    const [imageFiles, setImageFiles] = useState([]);         

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


    //start:: post image edit    
    // useEffect(() => {
    //     async function fetchImageFiles() {
    //         const imageUrls = ['http://localhost:3001/posts/images (4).jpeg'];
    //         const files = await Promise.all(
    //         imageUrls.map((imageUrl) => convertImageUrlToFile(imageUrl, 'image.png', 'image/png'))
    //         );
    //         setImageFiles(files);
    //     }
    
    //     fetchImageFiles(imageFiles);

    //     console.log()
    // }, []);
    

    //start:: image upload, preview and remove
    const filesUploadHandler = (event) => {
        console.log(event.target.files)
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
                    {formData.isCreate != undefined ? (
                        <img src={previewImage} className={styles.preview_img_wrap} />
                    ) : (
                        <img src={previewImage} className={styles.preview_img_wrap} />
                    )}
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

    const convertToBase64 = () => {
        const reader = new FileReader()
    
        reader.readAsDataURL(formData.image)
    
        reader.onload = () => {
          console.log('called: ', reader)
        //   setBase64IMG(reader.result)
        }
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
        dispatch(restSelectPost())
        props.deactivtateDrawer(false);
    }
    //end:: trigger drawer

    //start:: create/edit post form submit 
    const submitFormHandler = (event) => {
        event.preventDefault();
        const userId = user.data._id;
        const data = new FormData();
        data.append('title', title)
        data.append('text', text)
        data.append('userId', userId)
        
        for (let i of image) {
            data.append('image', i);
        }
        
        if(!selectedPost) {
            dispatch(createPost(data))
        }else{
            dispatch(updateSinglePost({ postData: data, postId: selectedPost._id }));
            dispatch(restSelectPost())
        }
        setFormData({
            title: '',
            text: '',
            image: []
        })
        // toast.success('Post created successfully', {position: 'top-center'});
        props.deactivtateDrawer(false);
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
                    <IconButton aria-label="close" onClick={drawerHandler} sx={{background: '#f2f2f2'}}>
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

                    <Button onClick={convertToBase64}>based64</Button>
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
                        <Button onClick={drawerHandler} variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
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
