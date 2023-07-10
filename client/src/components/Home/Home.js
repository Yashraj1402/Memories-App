import React, {useState, useEffect} from 'react'
import {Grow, Grid, Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import classes from "../../styles.module.css";

const Home = () => {
    const [currentId, setCurrentID] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getPosts());
    }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container >
        <Grid className={classes.mainContainer} container justify="space-between" alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentID={setCurrentID} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
