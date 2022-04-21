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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';

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
          `http://${process.env.NEXT_PUBLIC_BASEURL_API}/Employee/login`,
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
        'Please enter valid username or length greater than 3';
    }
    if (pass.trim().length < 3) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid password or length greater than 3';
    }
    setErrorMessages(catenameErr);
    return isValid;
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
            Employee Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              label="Username Address"
              name="uname"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              // autoComplete="uname"
              // autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              // autoComplete="current-password"
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
