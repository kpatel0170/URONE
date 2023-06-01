import React, {Fragment} from 'react';
import {useState} from 'react';
import Search from './Search';

import {Avatar, Grid } from '@mui/material';

const Header = props => {    
    return(
        <React.Fragment>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={3}>
                    LOGO ICON
                </Grid>
                <Grid item xs={6}>
                    <Search />
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Avatar sx={{border: 2, borderColor: '#1473E6'}} alt="Remy Sharp" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />                                
                    <div>
                        <svg width="20" height="20" viewBox="0 0 32 32"><path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/><path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/><path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/></svg>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default Header;