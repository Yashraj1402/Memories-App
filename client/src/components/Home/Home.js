import React, {useState, useEffect} from 'react'
import {Grow, Grid, Container, Paper, AppBar, TextField, Button, Chip} from '@mui/material';
import { useDispatch } from 'react-redux';
import {getPosts, getPostsBySearch} from '../../actions/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Posts/Pagination';

import classes from "../../styles.module.css";
import homeClasses from "./Home.module.css";

function useQuery()
{
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentID] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [searchValue, setSearchValue] = useState('');
  const [tagsValue, setTagsValue] = useState([]);
  const [tags, setTags] = useState([]); 

  const searchPost = () => {
    if(searchValue.trim() || tags){
      dispatch(getPostsBySearch({searchValue, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${searchValue || 'none'}&tags=${tags.join(',')}`);
    } else{
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost();
    }
  };

  const handleKeyPressTags = (event) => {
    if (event.key === 'Enter' && tagsValue.trim() !== '') {
      console.log('tags value: ' + tagsValue);
      setTags([...tags, tagsValue]);
      setTagsValue('');
    }
  };

  const handleDeleteTags= (tagToDelete) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.mainContainer} container justify="space-between" alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} /*sx={{paddingRight: '25px'}}*/>
            <AppBar className={homeClasses.searchBar} position="static" color="inherit">
              <TextField
                name = 'search'
                variant = 'outlined'
                label = 'Search Posts'
                onKeyDown={handleKeyPress}
                fullWidth
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              
               <TextField
                label="Search Tags"
                value={tagsValue}
                onChange={(event) => setTagsValue(event.target.value)}
                onKeyDown={handleKeyPressTags}
                variant="outlined"
                InputProps={{
                  endAdornment: tagsValue && (
                    <Chip
                      label={tagsValue}
                      variant="outlined"
                      color="primary"
                      onDelete={() => setTagsValue('')}
                    />
                  ),
                }}

                sx={{
                  margin: '12px 0px'
                }}
                />
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={handleDeleteTags(tag)}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem'}}
                  />
                ))}

                <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentID={setCurrentID} />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
