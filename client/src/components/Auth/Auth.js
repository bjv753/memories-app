import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
      const classes = useStyles();
      const [showPassword, setShowPassword] = useState(false)
      const [isSignup, setIsSignup] = useState(false);
      const dispatch = useDispatch();

      const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

      const handleSubmit = () => {

      }

      const handleChange = () => {

      }

      const switchMode = () => {
            setIsSignup((prevIsSignup) => !prevIsSignup);
            handleShowPassword(false);
      }

      const googleSuccess = (res) => {
            const result = res?.profileObj;
            const token = res?.tokenId;

            try {
                  dispatch({ type: 'AUTH', data: { result, token } })
            } catch (error) {
                  console.log(error)
            }
      }

      const googleFailure = (error) => {
            console.log(error);
            console.log("Google Sign In was unsuccessful. Try again later.");
      }

  return (
    <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                  </Avatar>
                  <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                  <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                              { isSignup && (
                                          <>
                                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                                <Input name="firstName" label="First Name" handleChange={handleChange}  half />
                                          </>
                                          )}
                                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                                <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                              {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin 
                              clientId="339541749149-5058gkj0c0v105ic6e6h4uvf8dg50q88.apps.googleusercontent.com"
                              render={(renderProps) => (
                                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                          Google Sign In
                                    </Button>
                              )}
                              onSuccess={googleSuccess}
                              onFailure={googleFailure}
                              cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end" >
                        <Grid item>
                              <Button onClick={switchMode} >
                                    { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up!" }
                              </Button>
                        </Grid>
                        </Grid>
                  </form>
            </Paper>
    </Container>
  );
};

export default Auth