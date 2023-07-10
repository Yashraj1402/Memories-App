import React, { useState } from 'react';
import classes from "./Auth.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input'
import { signin, signup } from '../../actions/auth';
import Icon from './icon';

// Google Log in Imports:
// import { GoogleLogin } from '@react-oauth/google';
import {GoogleLoginButton} from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { borderColor, display } from '@mui/system';

// 218632832453-pefat8tt5ofnfhg7h97h2j9bsla9ivbv.apps.googleusercontent.com

const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  // {
  //   const prev = showPassword;
  //   setShowPassword(!prev);
  // }

  const handleToggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res;
    const token = res?.access_token;
    try {
      dispatch({ type: 'AUTH', data: { result, token }});
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (err) => {
    console.log("Google Sign In wasn't successful. Try again later.")
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <div className={classes.mainContainer}>
          <div className={classes.iconAndheading}>
            <Avatar className={classes.lockContainer} sx={{ color: 'rgb(4 63 87)', backgroundColor: '#ff8585' }}>
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
              <Button type="submit" fullWidth variant='contained' color='primary'>
                {
                  isSignup ? 'Sign Up' : 'Log In'
                }
              </Button>
            </div>

            {/* <GoogleLogin

              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon/>}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}

              onSuccess={googleSuccess}
              onError={googleError}
              cookiePolicy="single_host_origin"
            /> */}

            <LoginSocialGoogle
              client_id={"218632832453-pefat8tt5ofnfhg7h97h2j9bsla9ivbv.apps.googleusercontent.com"}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }) => {
                // console.log(provider, data);
                googleSuccess(data);
              }}
              onReject={(err) => {
                // console.log(err);
                googleError(err);
              }}
            >
              <GoogleLoginButton
                className={classes.googleButton}
                text='Log In with Google'
                fullWidth
              />
            </LoginSocialGoogle>

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
