import React from 'react';
import {useState} from 'react';
import { Box, TextField, Button } from '@mui/material';
import styles from "./Search.module.css";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    const searchInputHandler = (event)=>{
        setSearchValue(event.target.value);
    }

    const searchFormHandler = (event) => {
        event.preventDefault();
        console.log(searchValue)
        setSearchValue('')
    }

    return(     
        <form onSubmit={searchFormHandler}>
            <Box sx={{ display: 'flex', position: 'relative' }}>
                <TextField 
                    id="search" 
                    name="search"
                    type="text" 
                    placeholder="Search"
                    onChange={searchInputHandler}
                    value={searchValue}
                    sx={{width:1}}
                    className={styles.form_wrap}
                    />
                <Button sx={{position: 'absolute', right: '10px', top: '3px', background: 'transparent', color: '#9a9595'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z" fill="currentColor"></path></svg>
                </Button>
            </Box>
        </form>
    )
}
export default Search;