import React from 'react';
import classes from "./Post.module.css";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts'
import { useNavigate } from 'react-router-dom';

const Post = ({post, setCurrentID}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    // console.log(user);
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
                <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }

        return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };
    
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return(
       <Card className={classes.card} raised elevation={6}>

        <ButtonBase sx={{display: 'block', textAlign: 'initial'}} onClick = {openPost} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={() => setCurrentID(post._id)}
                    >
                        <MoreHorizIcon fontSize="small" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h4" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography className={classes.message} variant="body1" color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                <Likes />
            </Button>
            {(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" 
                    onClick={() => {
                        dispatch(deletePost(post._id))
                    }}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            )}
        </CardActions>
       </Card>
    );
}

export default Post;