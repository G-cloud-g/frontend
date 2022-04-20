import {
  Box,
  InputLabel,
  Grid,
  FormHelperText,
  Typography,
  TextField,
  Container,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';

/* eslint-disable */

function ResetToken(props) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { type } = router.query;
  const [user, setUser] = useState(type);
  useEffect(() => {
    if (type) {
      // console.log('reset user ', user);
      setUser(type);
    }
  }, [user, type]);
  const [passwordStat, setpasswordStat] = React.useState({
    confirmpassword: true,
    password: true,
  });

  const [pwd, setpwd] = useState('');
  const [cpwd, setcpwd] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmpasswordErr, setconfirmpasswordErr] = useState(false);

  const [loading, setloading] = useState(false);

  const handleClickShowPassword = (target) => () => {
    setpasswordStat({
      ...passwordStat,
      [target]: !passwordStat[target],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateFields = () => {
    let passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*-.])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&.*-]{8,}$/;

    let hasErr = false;
    setPasswordErr(null);
    setconfirmpasswordErr(null);

    if (!pwd) {
      setPasswordErr('Please enter password.');
      hasErr = true;
    }
    if (!cpwd) {
      setconfirmpasswordErr('Please enter confirm password.');
      hasErr = true;
    }

    if (pwd.length < 8) {
      setPasswordErr(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    } else if (!passwordRegex.test(pwd)) {
      setPasswordErr(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    }

    if (cpwd.trim() !== pwd.trim()) {
      setconfirmpasswordErr('Password should be same as new password.');
      hasErr = true;
    }
    return hasErr;
  };

  const updatePassword = async () => {
    let validate = validateFields();
    if (!validate) {
      setloading(true);

      const credentials = {
        OTP: otp,
        newPass: pwd,
        email,
      };
      if (user === 'student') {
        await axios
          .patch(
            `http://${process.env.NEXT_PUBLIC_BASEURL_API}/${user}/resetpwd`,
            credentials
            // user,
          )
          .then((response) => {
            // console.log('response ', response.data);
            setloading(false);
            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: response.data.message,
                type: 'success',
              },
            });
            router.push(`/`);
          })
          .catch((err) => {
            // console.log('err.response ', err.response);
            setloading(false);

            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: err.response?.data?.error,
                type: 'error',
              },
            });
          });
      } else {
        await axios
          .patch(
            `http://${process.env.NEXT_PUBLIC_BASEURL_API}/expert/resetpwd`,
            credentials
            // user,
          )
          .then((response) => {
            // console.log('response ', response.data);

            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: response.data.message,
                type: 'success',
              },
            });
            router.push(`/`);
          })
          .catch((err) => {
            // console.log('err.response ', err.response);
            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: err.response?.data?.error,
                type: 'error',
              },
            });
          });
      }
    }
  };

  const handleRedirectBack = () => {
    window.location = '/';
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          p: '10px 25px 30px 25px',
          mt: '2.5rem',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Typography variant="h5" align="center">
            Update Your Password
          </Typography>
          <Grid item xs={12} sx={{ mt: '10px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              id="outlined-basic"
              required
              fullWidth
              label="Enter OTP"
              name="otp"
              // placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: '10px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: '10px' }}>
            <InputLabel> New Password </InputLabel>
            <OutlinedInput
              fullWidth
              type={passwordStat.password ? 'password' : 'text'}
              sx={{ mt: 1 }}
              placeholder="New Password"
              name="password"
              onChange={(e) => setpwd(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword('password')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordStat.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={!!passwordErr}>{passwordErr}</FormHelperText>
          </Grid>
          <Grid item xs={12} sx={{ mt: '10px' }}>
            <InputLabel> Confirm Password </InputLabel>
            <OutlinedInput
              fullWidth
              type={passwordStat.confirmpassword ? 'password' : 'text'}
              sx={{ mt: 1 }}
              placeholder="Confirm Password"
              name="verifypassword"
              onChange={(e) => setcpwd(e.target.value)}
              error={!!confirmpasswordErr}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword('confirmpassword')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordStat.confirmpassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={!!confirmpasswordErr}>
              {confirmpasswordErr}
            </FormHelperText>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: '47px' }}
            className="secondary"
            loading={loading}
            onClick={updatePassword}
            disabled={!(pwd && cpwd)}
          >
            UPDATE PASSWORD
          </LoadingButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              m: 'auto',
            }}
          >
            <Typography
              sx={{
                cursor: 'pointer',
                color: '#4074d5',
                p: 0,
                m: 0,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={handleRedirectBack}
            >
              {' '}
              Back To Signin{' '}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ResetToken;
