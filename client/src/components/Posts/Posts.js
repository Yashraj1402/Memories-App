import React from 'react';
import classes from './Posts.module.css'
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = ({ setCurrentID }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    // console.log(posts);

    if(!posts.length && !isLoading) return 'No Posts to Show';
    return(
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                            <Post post={post} setCurrentID={setCurrentID} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;