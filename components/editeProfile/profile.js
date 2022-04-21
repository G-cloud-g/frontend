import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputLabel, Radio, Divider, FormHelperText } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import store from '/src/Redux/store';
// import UserIcon from 'assets/icons/User';
import { createStyles, makeStyles } from '@mui/styles';
// import isMobilePhone from 'validator/es/lib/isMobilePhone';
// import store from 'redux/store';
// import {
//   getUser,
//   UpdateUserDetails,
//   UpdatePassword,
// } from 'redux/action/landing.action';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import isMobilePhone from '../../node_modules/validator/es/lib/isMobilePhone';
import isEmail from '../../node_modules/validator/es/lib/isEmail';
/* eslint-disable */

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'transprent',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transprent',
  },
}));
// below object is written for default values of user
const useStyles = makeStyles((theme) =>
  createStyles({
    photobtn: {
      //  width: 'fit-content',
      background: theme.palette.primary.main,
      borderRadius: '5px',
      color: '#FFFFFF',
      textTransform: 'capitalize',
      border: '1px solid #FFFFFF',
      '&:hover': {
        color: theme.palette.primary.main,
        background: '#FFF',
        border: '1px solid ' + theme.palette.primary.main,
      },
    },
    camerabtn: {
      width: 20,
      height: 20,
    },
    usericon: {
      width: 120,
      height: 120,
      color: '#C4C4C4',
      cursor: 'pointer',
      boxShadow: '0 0 98px 6px rgba(0, 0, 0, 0.2)',
      borderRadius: '50%',
    },
    // scrollContainer: {
    //   '& .scrollbar-container': {
    //     position: 'relative',
    //     height: '100%',
    //   },
    //   '& .ps': {
    //     overflow: 'hidden !important',
    //     overflowAnchor: 'none',
    //     msOverflowStyle: 'none',
    //     touchAction: 'auto',
    //   },
    // },
  })
);

const ProfileSettings = () => {
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  // console.log('useselect ', userData);
  const [displayeditprofile, Setdisplayeditprofile] = useState(false);
  const [displayupdatepass, Setdisplayupdatepass] = useState(false);

  const [phonenoErr, setphonenoErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [lastnameErr, setlastnameErr] = useState(false);
  const [firstnameErr, setfirsnameErr] = useState(false);
  const [interestAreaErr, setcompanyNameErr] = useState(false);
  const [qualificationErr, setcompanyPositionErr] = useState(false);

  const [phoneno, setphoneno] = useState('');
  const [email, setemail] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [interestArea, setinterestArea] = useState('');
  const [qualification, setQualification] = useState([]);
  const [address, setAddress] = useState('');
  const [technology, setTechnology] = useState('');

  const [currentpassword, setcurrentpassword] = useState('');
  const [currentpassworderr, setcurrentpassworderr] = useState(false);
  const [currentpassworderrtext, setcurrentpassworderrtext] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [newpassworderr, setnewpassworderr] = useState(false);
  const [newpassworderrtext, setnewpassworderrtext] = useState('');
  const [cnfpassword, setcnfpassword] = useState('');
  const [cnfpassworderr, setcnfpassworderr] = useState(false);
  const [cnfpassworderrtext, setcnfpassworderrtext] = useState('');
  const [showpassword, setShowPassword] = useState(false);
  const [showpassword1, setShowPassword1] = useState(false);
  const [showpassword2, setShowPassword2] = useState(false);
  const [profileimg, setProfileImg] = useState();

  //   const { profileimg, setProfileImg } = props;
  // get userId from redux store
  //   const { user } = useSelector((state) => ({
  //     user: state.auth.user,
  //   }));
  const [mfa, setMfa] = useState(false);

  //setup useEffect to get current user details
  useEffect(() => {
    if (userData) {
      setfirstname(userData?.FirstName);
      setlastname(userData?.LastName);
      setphoneno(userData?.phone);
      setemail(userData?.email);
      setMfa(userData?.mfa);
      setinterestArea(userData?.Interestarea);
      setQualification(userData?.Qualification);
      setProfileImg(userData?.profileImg);
      setAddress(userData?.Address);
      setTechnology(userData?.Technology);
    }
  }, [userData]);

  //below function is written for show password after click on eye button
  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  //below function is written for hide password after click on eye button
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //below function is written for show password after click on eye button
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showpassword1);
  };
  //below function is written for hide password after click on eye button
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  //below function is written for show password after click on eye button
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showpassword2);
  };
  //below function is written for hide password after click on eye button
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handledisplayPass = (val) => {
    Setdisplayupdatepass(val);
  };

  //this function is used to update the user password
  const handleUpdatePass = (currentpass, newpass, updatepass) => {
    setcurrentpassworderr(false);
    setnewpassworderr(false);
    setcnfpassworderr(false);
    let hasErr = false;

    let passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*-.])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&.*-]{8,}$/;

    if (!currentpassword || currentpassword.length < 8) {
      setcurrentpassworderr(true);
      setcurrentpassworderrtext('Password should have at least 8 characters');
      hasErr = true;
    }
    if (!newpassword || newpassword.length < 8) {
      setnewpassworderr(true);
      setnewpassworderrtext(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    } else if (!passwordRegex.test(newpassword)) {
      setnewpassworderr(true);
      setnewpassworderrtext(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    } else if (currentpassword === newpassword) {
      setnewpassworderr(true);
      setnewpassworderrtext(
        'New password should not be same as current password.'
      );
      hasErr = true;
    }
    if (!cnfpassword || cnfpassword.length < 8) {
      setcnfpassworderr(true);
      setcnfpassworderrtext(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    } else if (cnfpassword !== newpassword) {
      setcnfpassworderr(true);
      setcnfpassworderrtext('Password should be same as New Password');
      hasErr = true;
    } else if (!passwordRegex.test(cnfpassword)) {
      setcnfpassworderr(true);
      setcnfpassworderrtext(
        'Password should be a minimum of 8 characters in length, with uppercase and lowercase characters, one special character, and one number.'
      );
      hasErr = true;
    }
    if (hasErr) {
      return true;
    }
    // if (currentpassword && newpassword && cnfpassword) {
    //   UpdatePassword(user._id, newpass, currentpass)
    //     .then((res) => {
    //       setcurrentpassword('');
    //       setnewpassword('');
    //       setcnfpassword('');
    //       setcurrentpassworderr(false);
    //       setnewpassworderr(false);
    //       setcnfpassworderr(false);
    //       setcurrentpassworderr(false);
    //       setnewpassworderr(false);
    //       setcnfpassworderr(false);
    //       Setdisplayupdatepass(false);
    //     })
    //     .catch((err) => {});
    // } else {
    // }
  };

  //this function is used to upload the image
  const onChangeProfile = (e) => {
    let files = e.target.files;
    let fsize = files[0]?.size;

    const file = Math.round(fsize / 1024);

    if (file > 1048) {
      store.dispatch({
        type: 'UPDATE_SNACK',
        payload: {
          snackbar: true,
          message: 'Please upload image less than 1MB.',
          type: 'info',
        },
      });
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      // console.log('file ', e.target.result);
      setProfileImg(e.target.result);
    };
  };

  const handleClear = () => {
    setProfileImg(null);
  };

  //this function is used to update the user profile
  const handleUpdateProfile = (
    id,
    fname,
    lname,
    phone,
    mfa,
    cname,
    cpos,
    profile
  ) => {
    let name = /^[a-zA-Z ]+$/;
    let hasErr = false;
    let phonenoRegx = new RegExp('^[0-9]+$');
    setphonenoErr(null);
    setlastnameErr(null);
    setfirsnameErr(null);
    setcompanyNameErr(null);
    setcompanyPositionErr(null);

    if (!fname) {
      setfirsnameErr('Please enter firstname.');
      hasErr = true;
    } else if (!name.test(fname)) {
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
    if (!phone) {
      setphonenoErr('Please enter phone number.');
      hasErr = true;
    } else if (!isMobilePhone(phone)) {
      setphonenoErr('Please enter valid phone number.');
      hasErr = true;
    } else if (!phonenoRegx.test(phone)) {
      setphonenoErr('Phone number should be numeric value.');
      hasErr = true;
    }
    if (!email) {
      setemailErr('Please enter email id.');
      hasErr = true;
    } else if (!isEmail(email)) {
      setemailErr('Please enter valid email id.');
      hasErr = true;
    }
    if (!cpos) {
      setcompanyPositionErr('Please enter company position.');
      hasErr = true;
    }
    if (!cname) {
      setcompanyNameErr('Please enter company name.');
      hasErr = true;
    }

    if (hasErr) {
      return true;
    }
    if (fname && lname && phone && cname && cpos) {
      setloading(true);
      dispatch({
        type: 'START_LOADING',
        payload: {
          loading: true,
        },
      });
      //   UpdateUserDetails(id, fname, lname, phone, mfa, cname, cpos, profile)
      //     .then((res) => {
      //       getUser(id)
      //         .then((data) => {
      //           setloading(false);
      //           Setdisplayeditprofile(false);
      //           dispatch({
      //             type: 'START_LOADING',
      //             payload: {
      //               loading: false,
      //             },
      //           });
      //         })
      //         .catch((err) => {
      //           setloading(false);
      //           dispatch({
      //             type: 'START_LOADING',
      //             payload: {
      //               loading: false,
      //             },
      //           });
      //         });
      //     })
      //     .catch((err) => {
      //       setloading(false);
      //       dispatch({
      //         type: 'START_LOADING',
      //         payload: {
      //           loading: false,
      //         },
      //       });
      //     });
      // }
    }
  };
  const fullname = `${firstname}${' '}${lastname}`;
  return (
    <Box
      sx={{
        marginTop: '0px',
        bgcolor: '#ccc',
        backgroundRepeat: 'no-repeat',
        //   backgroundImage:'url(/image/newbg.png)',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
        position: 'fixed',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      classes={{ root: classes.scrollContainer }}
    >
      <PerfectScrollbar>
        <Container component="main" maxWidth="md">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              paddingBottom: 5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  {profileimg ? (
                    <img
                      src={profileimg}
                      alert="no image"
                      className={classes.usericon}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: '120px',
                        height: '120px',
                        fontSize: '15px',
                        color: '#fff',
                        border: '1px solid #6198FF',
                        borderRadius: '50%',
                        background: '#E0E0E0',
                      }}
                    >
                      {/* <UserIcon
                          sx={{
                            width: '60px',
                            height: '60px',
                          }}
                        /> */}
                    </Avatar>
                  )}
                </StyledBadge>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <BootstrapTooltip title="Upload Profile" placement="bottom">
                    <IconButton
                      variant="contained"
                      component="label"
                      color="primary"
                      disabled={displayeditprofile === false}
                    >
                      <AddAPhotoIcon className={classes.camerabtn} />
                      <input
                        type="file"
                        hidden
                        onChange={(e) => onChangeProfile(e)}
                        name="myImage"
                        accept="image/*"
                      />
                    </IconButton>
                  </BootstrapTooltip>
                  <BootstrapTooltip title="Remove Profile" placement="bottom">
                    <IconButton
                      variant="contained"
                      component="label"
                      color="primary"
                      disabled={displayeditprofile === false}
                      onClick={handleClear}
                    >
                      <RemoveCircleOutlineIcon className={classes.camerabtn} />
                    </IconButton>
                  </BootstrapTooltip>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'inline',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: 3,
                }}
              >
                <Typography component="h1" variant="h4">
                  {fullname.length > 20
                    ? `${fullname.slice(0, 20)}...`
                    : fullname}
                </Typography>
                <Typography>{email}</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel> First Name * </InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="firstname"
                    autoComplete="firstname"
                    placeholder="Your First Name"
                    value={firstname}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile ? setfirstname(e.target.value) : null
                    }
                    error={!!firstnameErr}
                  />
                  <FormHelperText error={!!firstnameErr}>
                    {firstnameErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Last Name * </InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="lastname"
                    value={lastname}
                    autoComplete="lastname"
                    placeholder="Your Last Name"
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile ? setlastname(e.target.value) : null
                    }
                    error={!!lastnameErr}
                  />
                  <FormHelperText error={!!lastnameErr}>
                    {lastnameErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Email Address * </InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="email"
                    disabled={displayeditprofile ? false : true}
                    value={email}
                    onChange={(e) =>
                      displayeditprofile ? setemail(e.target.value) : null
                    }
                    autoComplete="email"
                    placeholder="Your Email Address"
                    error={!!emailErr}
                  />
                  <FormHelperText error={!!emailErr}>{emailErr}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Phone Number * </InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="phoneno"
                    autoComplete="phoneno"
                    value={phoneno}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile ? setphoneno(e.target.value) : null
                    }
                    placeholder="Your Phone Number"
                    error={!!phonenoErr}
                  />
                  <FormHelperText error={!!phonenoErr}>
                    {phonenoErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Address *</InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="compname"
                    autoComplete="compname"
                    value={address}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile ? setAddress(e.target.value) : null
                    }
                    placeholder="Your Address"
                    error={!!interestAreaErr}
                  />
                  <FormHelperText error={!!interestAreaErr}>
                    {interestAreaErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Qualification *</InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="comppos"
                    autoComplete="comppos"
                    value={qualification}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile
                        ? setQualification(e.target.value)
                        : null
                    }
                    placeholder="Your Qualification"
                    error={!!qualificationErr}
                  />
                  <FormHelperText error={!!qualificationErr}>
                    {qualificationErr}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel> Interest Area *</InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="compname"
                    autoComplete="compname"
                    value={interestArea}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile
                        ? setinterestArea(e.target.value)
                        : null
                    }
                    placeholder="Your interestarea"
                    error={!!interestAreaErr}
                  />
                  <FormHelperText error={!!interestAreaErr}>
                    {interestAreaErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel> Technology *</InputLabel>
                  <TextField
                    required
                    variant="outlined"
                    sx={{ mt: 1 }}
                    fullWidth
                    name="comppos"
                    autoComplete="comppos"
                    value={technology}
                    disabled={displayeditprofile ? false : true}
                    onChange={(e) =>
                      displayeditprofile ? setTechnology(e.target.value) : null
                    }
                    placeholder="Your Technology"
                    error={!!qualificationErr}
                  />
                  <FormHelperText error={!!qualificationErr}>
                    {qualificationErr}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={mfa === true}
                        onClick={() =>
                          displayeditprofile
                            ? mfa === true
                              ? setMfa(false)
                              : setMfa(true)
                            : null
                        }
                        disabled={displayeditprofile === false}
                      />
                    }
                    value={mfa}
                    sx={{ fontSize: '12px' }}
                    label="Use multi-factor authentication"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    sx={{ mb: 2, height: '40px', minWidth: 180 }}
                    className="secondary"
                    onClick={() =>
                      displayeditprofile
                        ? handleUpdateProfile(
                            // user._id,
                            firstname,
                            lastname,
                            phoneno,
                            mfa,
                            interestArea,
                            qualification,
                            profileimg
                          )
                        : Setdisplayeditprofile(true)
                    }
                    loading={loading}
                  >
                    {displayeditprofile ? 'Update Profile' : 'Edit Profile'}
                  </LoadingButton>
                </Grid>
                <Divider
                  sx={{
                    background: '#BDBDBD',
                    mt: 2,
                    width: '100%',
                    height: 2,
                  }}
                />
                <Grid item xs={12} sm={6}>
                  <Typography component="h1" variant="h5">
                    {displayupdatepass ? 'Change Password' : null}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    sx={{ mb: 2, height: '40px', minWidth: 180 }}
                    className="secondary"
                    onClick={() =>
                      displayupdatepass
                        ? handleUpdatePass(
                            currentpassword,
                            newpassword,
                            cnfpassword
                          )
                        : handledisplayPass(true)
                    }
                    // onClick={()=>displayupdatepass ? Setdisplayupdatepass(false):Setdisplayupdatepass(true)}
                    loading={loading}
                  >
                    {displayupdatepass ? 'Update Password' : 'Edit Password'}
                  </LoadingButton>
                </Grid>
                {displayupdatepass ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <InputLabel error={!!currentpassworderr}>
                        {' '}
                        Current Password
                        {displayupdatepass ? (
                          <span style={{ marginLeft: 5 }}>*</span>
                        ) : null}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        fullWidth
                        type={showpassword ? 'text' : 'password'}
                        sx={{ mt: 1 }}
                        placeholder="Current Password"
                        error={!!currentpassworderr}
                        value={currentpassword}
                        onChange={(e) => setcurrentpassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showpassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error={!!currentpassworderr}>
                        {currentpassworderr ? currentpassworderrtext : null}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel error={!!newpassworderr}>
                        {' '}
                        New Password
                        {displayupdatepass ? (
                          <span style={{ marginLeft: 5 }}>*</span>
                        ) : null}{' '}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password1"
                        fullWidth
                        type={showpassword1 ? 'text' : 'password'}
                        placeholder="New password"
                        sx={{ mt: 1 }}
                        value={newpassword}
                        error={!!newpassworderr}
                        onChange={(e) => setnewpassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword1}
                              edge="end"
                            >
                              {showpassword1 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error={!!newpassworderr}>
                        {newpassworderr ? newpassworderrtext : null}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel error={!!cnfpassworderr}>
                        {' '}
                        Confirm Password
                        {displayupdatepass ? (
                          <span style={{ marginLeft: 5 }}>*</span>
                        ) : null}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password2"
                        type={showpassword2 ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={cnfpassword}
                        onChange={(e) => setcnfpassword(e.target.value)}
                        fullWidth
                        sx={{ mt: 1 }}
                        error={!!cnfpassworderr}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              edge="end"
                            >
                              {showpassword2 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error={!!cnfpassworderr}>
                        {cnfpassworderr ? cnfpassworderrtext : null}
                      </FormHelperText>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Box>
          </Box>
        </Container>
      </PerfectScrollbar>
    </Box>
  );
};
export default ProfileSettings;
