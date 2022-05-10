import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
// import {
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
// } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://www.oxcytech.com/">
        Oxcytech System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const theme = createTheme();

export default function SignIn() {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [showpassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateFn();

    if (isValid == true) {
      const userdata = {
        UserName: uname,
        password: pass,
      };
      await axios
        .post(
          `http://${process.env.NEXT_PUBLIC_BASEURL_API}/admin/login`,
          userdata
          // user,
        )
        .then((response) => {
          dispatch({
            type: 'UPDATE_SNACK',
            payload: {
              snackbar: true,
              message: 'Login successfully',
              type: 'success',
            },
          });
          const userData = response?.data;
          const cloneUser = (({ token, ...d }) => d)(userData);
          dispatch({
            type: 'UPDATE_USERDATA',
            payload: cloneUser,
          });
          let token = response?.data?.token;
          let userType = response?.data?.UserType;
          localStorage.setItem('token', token);
          localStorage.setItem('UserType', userType);
          router.push('/dashboard');
        })
        .catch((err) => {
          dispatch({
            type: 'UPDATE_SNACK',
            payload: {
              snackbar: true,
              message: err.response?.data?.msg,
              type: 'error',
            },
          });
        });
    }
  };
  const validateFn = () => {
    const catenameErr = {};
    let isValid = true;
    if (uname.trim().length < 3) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid username or length greater than 4';
    }
    if (pass.trim().length < 3) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid password or length greater than 5';
    }
    setErrorMessages(catenameErr);
    return isValid;
  };
  //below function is written for show password after click on eye button
  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  //below function is written for hide password after click on eye button
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputLabel sx={{ mt: 1 }}>Username</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              placeholder="Username "
              name="uname"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              // autoComplete="uname"
              // autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              // autoComplete="current-password"
            /> */}
            <InputLabel sx={{ mt: 0.6, mb: 0.8 }}>
              {' '}
              Password
              {/* {displayupdatepass ? (
                <span style={{ marginLeft: 5 }}>*</span>
              ) : null} */}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              fullWidth
              type={showpassword ? 'text' : 'password'}
              sx={{ mt: 1 }}
              placeholder="Current Password"
              // error={!!currentpassworderr}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs sx={{ cursor: 'pointer', textAlign: 'center' }}>
                <Link variant="body2" onClick={() => router.push('/')}>
                  Goto login page
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
