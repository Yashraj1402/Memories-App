import React, {useEffect} from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPosts, getPostsBySearch } from '../../actions/posts';

import classes from './PostDetails.module.css';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => { 
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if(post) dispatch(getPostsBySearch({ searchValue: 'none', tags: post?.tags.join(',')}));
  }, [post])

  if(!post) return null;

  if(isLoading){
    return <Paper elevation={6} className={classes.loadingPaper}> <CircularProgress size='7em' /> </Paper>
  }

  const recommendedPosts = posts.filter(({_id}) => post._id !== _id);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };
  
  return (
    <Paper sx={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {console.log("These are recommended posts:\n")}
            {recommendedPosts.map((rp) => (
              <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(rp._id)} key={rp._id}>
                <Typography gutterBottom variant='h6'>{rp.title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{rp.name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{rp.message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes: {rp.likes.length}</Typography>
                <img src={rp.selectedFile} width='200px' />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails
