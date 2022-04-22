import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  InputLabel,
  FormHelperText,
  Typography,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import { FormControlLabel, Radio, Typography, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import { signUpUser_service } from 'authentication/services/userservice';
import isEmail from '../../../node_modules/validator/es/lib/isEmail';
import isMobilePhone from '../../../node_modules/validator/es/lib/isMobilePhone';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

/* eslint-disable */

export default function Register(props) {
  //   const { setSelectTab, appSumoEnable } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmpasswordErr, setconfirmpasswordErr] = useState(false);
  const [phonenoErr, setphonenoErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);

  const [lastnameErr, setlastnameErr] = useState(false);
  const [firstnameErr, setfirsnameErr] = useState(false);
  const [appsumoErr, setappsumoErr] = useState(false);

  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [email, setemail] = useState('');
  const [companyname, setcompanyname] = useState('');
  const [companyposition, setcompanyposition] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [username, setusername] = useState('');

  const [passwordStat, setpasswordStat] = useState({
    confirmpassword: true,
    password: true,
  });

  const handleClickShowPassword = (target) => () => {
    setpasswordStat({
      ...passwordStat,
      [target]: !passwordStat[target],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignup = () => {
    // let validate = validateFields();

    // if (!validate) {
    setloading(true);

    const registerCredentials = {
      FirstName: firstname,
      LastName: lastname,
      UserName: username,
      Email: email.toLowerCase(),
      password: password,
    };

    const response = axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BASEURL_API}/employee/signup`,
        registerCredentials
        // user,
      )
      .then((response) => {
        // console.log('expt resp', response);
        dispatch({
          type: 'UPDATE_SNACK',
          payload: {
            snackbar: true,
            message: response.data.message,
            type: 'success',
          },
        });
        setloading(false);
        router.push('/dashboard');
        setPasswordErr('');
        setusername('');
        setemail('');
        setfirsnameErr('');
        setlastname('');
        setconfirmpassword('');
      })
      .catch((err) => {
        console.log('expt resp', err);
        dispatch({
          type: 'UPDATE_SNACK',
          payload: {
            snackbar: true,
            message: 'something went wrong',
            type: 'error',
          },
        });
      });
    setloading(false);

    // .then((response) => {
    //   console.log('emp resp', response);
    //   dispatch({
    //     type: 'UPDATE_SNACK',
    //     payload: {
    //       snackbar: true,
    //       type: 'success',
    //       message: 'User created successfully',
    //     },
    //   });
    //   setloading(false);
    //   router.push('/dashboard');
    // })
    // .catch((err) => {
    //   console.log('emp resp', err);
    //   dispatch({
    //     type: 'UPDATE_SNACK',
    //     payload: {
    //       snackbar: true,
    //       type: 'error',
    //       message: err.response,
    //     },
    //   });
    //   setloading(false);
    // });

    //   if (appSumoEnable && code) {
    //     registerCredentials['code'] = code;
    //   }

    // registerUser(registerCredentials);
    // }
  };

  const validateFields = () => {
    let name = /^[a-zA-Z ]+$/;
    let hasErr = false;
    // let passwordRegex =
    // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{7,20}$/;
    let passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*-.])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&.*-]{8,}$/;
    let phonenoRegx = new RegExp('^[0-9]+$');

    setPasswordErr(null);
    setconfirmpasswordErr(null);
    setphonenoErr(null);
    setemailErr(null);
    setcompanynameErr(null);
    setcompanypositionErr(null);
    setlastnameErr(null);
    setfirsnameErr(null);
    setappsumoErr(null);

    // if (appSumoEnable && !code) {
    //   setappsumoErr('Please enter AppSumo code.');
    //   hasErr = true;
    // }

    if (!firstname) {
      setfirsnameErr('Please enter firstname.');
      hasErr = true;
    } else if (!name.test(firstname)) {
      setfirsnameErr('Firstname should be alphabets.');
      hasErr = true;
    }

    if (!lastname) {
      setlastnameErr('Please enter lastname.');
      hasErr = true;
    } else if (!name.test(lastname)) {
      setlastnameErr('Lastname should be alphabets.');
      hasErr = true;
    }

    if (!email.toLowerCase() || !isEmail(email.toLowerCase())) {
      setemailErr('Please enter valid email address.');
      hasErr = true;
    }

    if (!password || password.length < 8) {
      setPasswordErr(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordErr(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    }

    if (confirmpassword.trim() !== password.trim()) {
      setconfirmpasswordErr('Password should be same as new password.');
      hasErr = true;
    }

    if (!phoneno || !isMobilePhone(phoneno)) {
      setphonenoErr('Please enter valid phone number.');
      hasErr = true;
    } else if (!phonenoRegx.test(phoneno)) {
      setphonenoErr('Phone number should be numeric value.');
      hasErr = true;
    }

    if (!companyposition) {
      setcompanypositionErr('Please enter company position.');
      hasErr = true;
    }

    if (!companyname) {
      setcompanynameErr('Please enter company name.');
      hasErr = true;
    }

    return hasErr;
  };

  const registerUser = (credentials) => {
    setloading(true);
    // call api for signIn
    signUpUser_service(credentials)
      .then((res) => {
        if (res) {
          //   setSelectTab(4);
        }
        setloading(false);
      })
      .catch((err) => {
        setloading(false);

        if (err === 422) {
          setemailErr('Email address already exists.');
        }
      });
  };

  const submitBtnStatus = () => {
    // if (appSumoEnable && !code.trim()) {
    //   return true;
    // } else if (
    //   !firstname ||
    //   !lastname ||
    //   !email ||
    //   !phoneno ||
    //   !companyname ||
    //   !companyposition ||
    //   !password ||
    //   !confirmpassword
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: '900px',
          padding: '0 24px',
          margin: 'auto',
          marginTop: '2.5rem',
        }}
      >
        <Box sx={{ mt: 1, overflow: 'hidden' }}>
          <Typography variant="h3" sx={{ m: '20px 0', textAlign: 'center' }}>
            Employee Signup
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6} sx={{ mt: '5px' }}>
              <InputLabel> First Name * </InputLabel>
              <TextField
                required
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                name="firstname"
                autoComplete="firstname"
                placeholder="First Name"
                onChange={(e) => setfirstname(e.target.value)}
                error={!!firstnameErr}
              />
              <FormHelperText error={!!firstnameErr}>
                {firstnameErr}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: '5px' }}>
              <InputLabel> Last Name * </InputLabel>
              <TextField
                required
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                name="lastname"
                autoComplete="lastname"
                placeholder="Last Name"
                onChange={(e) => setlastname(e.target.value)}
                error={!!lastnameErr}
              />
              <FormHelperText error={!!lastnameErr}>
                {lastnameErr}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel> Username * </InputLabel>
              <TextField
                required
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                name="Username"
                autoComplete="Username"
                placeholder="Username"
                onChange={(e) => setusername(e.target.value)}
                error={!!lastnameErr}
              />
              <FormHelperText error={!!lastnameErr}>
                {lastnameErr}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel> Email Address * </InputLabel>
              <TextField
                required
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                name="email"
                autoComplete="email"
                placeholder="Your Email Address"
                onChange={(e) => setemail(e.target.value)}
                error={!!emailErr}
              />
              <FormHelperText error={!!emailErr}>{emailErr}</FormHelperText>
            </Grid>
            {/* <Grid item xs={12} md={6}>
            <InputLabel> Phone Number * </InputLabel>
            <TextField
              required
              variant="outlined"
              sx={{ mt: 1 }}
              fullWidth
              name="phoneno"
              autoComplete="phoneno"
              placeholder="Phone Number"
              onChange={(e) => setphoneno(e.target.value)}
              error={!!phonenoErr}
            />
            <FormHelperText error={!!phonenoErr}>{phonenoErr}</FormHelperText>
          </Grid> */}
            {/* <Grid item xs={12} md={6}>
            <InputLabel> Company Name *</InputLabel>
            <TextField
              required
              variant="outlined"
              sx={{ mt: 1 }}
              fullWidth
              name="companyname"
              placeholder="Company Name"
              onChange={(e) => setcompanyname(e.target.value)}
              error={!!companynameErr}
            />
            <FormHelperText error={!!companynameErr}>
              {companynameErr}
            </FormHelperText>
          </Grid> */}
            {/* <Grid item xs={12} md={6}>
            <InputLabel> Company Position *</InputLabel>
            <TextField
              required
              variant="outlined"
              sx={{ mt: 1 }}
              fullWidth
              name="companyposition"
              placeholder="Company Position"
              onChange={(e) => setcompanyposition(e.target.value)}
              error={!!companypositionErr}
            />
            <FormHelperText error={!!companypositionErr}>
              {companypositionErr}
            </FormHelperText>
          </Grid> */}

            <Grid item xs={12} md={6}>
              <InputLabel> Password * </InputLabel>
              <OutlinedInput
                fullWidth
                type={passwordStat.password ? 'password' : 'text'}
                sx={{ mt: 1 }}
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                error={!!passwordErr}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword('password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordStat.password ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <FormHelperText error={!!passwordErr}>
                {passwordErr}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel> Verify Password * </InputLabel>
              <OutlinedInput
                fullWidth
                error={!!confirmpasswordErr}
                type={passwordStat.confirmpassword ? 'password' : 'text'}
                sx={{ mt: 1 }}
                name="verifypassword"
                placeholder="Verify Password"
                onChange={(e) => setconfirmpassword(e.target.value)}
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

            {/* {!!appSumoEnable && (
            <Grid item xs={12}>
              <InputLabel> Enter AppSumo Code * </InputLabel>
              <TextField
                required
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                name="code"
                autoComplete="email"
                placeholder=" Enter Code "
                onChange={(e) => setcode(e.target.value)}
                error={!!appsumoErr}
              />
              <FormHelperText error={!!appsumoErr}>{appsumoErr}</FormHelperText>
            </Grid>
          )} */}

            {/* <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: '10px' }}>
              Password should be a minimum of 8 characters in length, with
              uppercase and lowercase characters, one special character, and one
              number.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={<Radio checked={mfa} onClick={() => setMfa(!mfa)} />}
              sx={{ fontSize: '12px' }}
              label="Use multi-factor authentication"
            />
          </Grid> */}
            <Grid item xs={12}>
              <LoadingButton
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2, height: '47px' }}
                className="secondary"
                onClick={handleSignup}
                loading={loading}
                disabled={
                  !(
                    firstname &&
                    lastname &&
                    username &&
                    email &&
                    password === confirmpassword
                  )
                }
              >
                CREATE ACCOUNT
              </LoadingButton>
              {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link
                target="_blank"
                href="https://www.intely.io/privacy-policy/"
              >
                Privacy And Policy
              </Link>
              <Link
                target="_blank"
                href="https://www.intely.io/terms-and-conditions"
              >
                Terms And Conditions
              </Link>
            </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
