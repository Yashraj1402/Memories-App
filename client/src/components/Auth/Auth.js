import React, { useState } from 'react';
import classes from "./Auth.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'
import { signin, signup } from '../../actions/auth';

const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector(state => state.auth.loginError);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
  
  const handleToggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <div className={classes.mainContainer}>
          <div className={classes.iconAndheading}>
            <Avatar className={classes.lockContainer} sx={{ color: 'rgb(33 33 33)', backgroundColor: '#9bc9ff' }}>
              <div className={classes.lockIcon}><LockOutlinedIcon /></div>
            </Avatar>
            <div className={classes.heading}><Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography></div>
          </div>

          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.formContainer}>
              {
                isSignup && (
                  <>
                    <div className={classes.firstAndlastName}>
                      <div className={classes.inputField}><Input name="firstName" label="First Name" type='text' autoFocus half handleChange={handleChange} /></div>
                      <div className={classes.inputField}><Input name="lastName" label="Last Name" type='text' half handleChange={handleChange} /></div>
                    </div>
                  </>
                )
              }

              <div className={classes.emailAndpassword}>
                {
                  (!loginError || isSignup) ? null : <div className={classes.inputField} style={{color: 'red'}}>Incorrect Credentials!</div>
                }
                <div className={classes.inputField}><Input name="email" label="Email Address" type="email" handleChange={handleChange} /></div>
                <div className={classes.inputField}><Input name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} /></div>
              </div>

              {
                isSignup && (
                  <div className={`${classes.confirmPassword} ${classes.inputField}`}><Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} /></div>
                )
              }
            </div>

            <div className={classes.submit}>
              <Button type="submit" fullWidth variant='contained' color='primary' size='large'>
                {
                  isSignup ? 'Sign Up' : 'Log In'
                }
              </Button>
            </div>

            <div className={classes.toggleForm}>
              {isSignup ?
                <>
                  <div className={classes.smallButtons}>Already have an account?<Button sx={{ margin: '0px', padding: '0px', fontSize: 'smaller' }} onClick={handleToggleForm} >Log In</Button></div>
                </>
                :
                <>
                  <div className={classes.smallButtons}>Don't have an account?<Button sx={{ margin: '0px', padding: '0px', fontSize: 'smaller' }} onClick={handleToggleForm} >Sign Up</Button></div>
                </>
              }
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  )
}

export default Auth
