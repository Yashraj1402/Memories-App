import React, {useState, useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import algoFarm from '../../images/AlgoFarmLogo.png';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import classes from './Navbarstyles.module.css';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const onClickLogo = () => navigate('/');
  
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
    
    navigate('/');
    
    setUser(null)
  };


  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = decode(token);

      if(decodedToken*1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.container}>
        <div className={classes.brandContainer} onClick={onClickLogo}>
          <Typography component={Link} className={classes.heading} variant='h2' style={{ textDecoration: 'none' }}>AlgoFarm</Typography>
          <img className={classes.image} src={algoFarm} alt="AlgoFarm" height={60} />
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar alt={user.result.name} src={user.result.picture} sx={{marginRight: '10px'}}/>
              <Typography className={classes.userName} variant='h6' sx={{marginRight: '15px'}}>{user.result.name}</Typography>
              <Button variant='contained' className={classes.logout} color='secondary' onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default Navbar
