import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../../../styles/Login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import StudentPage from '../Student/Studentsignupform';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const baseURL = 'http://localhost:3001';
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({});
  const [val, setVal] = useState(0);
  const [user1, setUser1] = useState({});
  const [errorMessages1, setErrorMessages1] = useState({});
  useEffect(() => {
    // console.log('signup expt');
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    // const isValid = validateFn();

    // if (isValid == true) {
    if (val === 1) {
      const {
        name,
        uname,
        email,
        pass,
        phone,
        address,
        qualification,
        technology,
      } = user;
      const userdata = {
        Name: name,
        UserName: uname,
        Email: email,
        password: pass,
        phone: phone,
        Address: address,
        Qualification: qualification,
        Technology: technology,
      };
      // console.log('expert cred ', user);

      axios
        .post(
          `http://${process.env.NEXT_PUBLIC_BASEURL_API}/expert/signup`,
          userdata
          // user,
        )
        .then((response) => {
          console.log('expt resp', response);
          dispatch({
            type: 'UPDATE_SNACK',
            payload: {
              snackbar: true,
              message: 'User created successfully',
              type: 'success',
            },
          });
          router.push('/');
        })
        .catch((err) => {
          console.log('expt resp', err);
          dispatch({
            type: 'UPDATE_SNACK',
            payload: {
              snackbar: true,
              message: err.response,
              type: 'error',
            },
          });
        });
    }
    // }
  };

  // const validateFn = () => {
  //   const catenameErr = {};
  //   let isValid = true;
  //   const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  //   if (
  //     user?.name == null ||
  //     user?.name.trim() == '' ||
  //     user?.name == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.name = 'Please enter Name';
  //   }
  //   if (!re.test(user?.email) && catenameErr) {
  //     isValid = false;
  //     catenameErr.email = 'Please enter valid email';
  //   }
  //   if (user?.uname.trim().length < 4) {
  //     isValid = false;
  //     catenameErr.uname =
  //       'Please enter valid username or length greater than 4';
  //   }
  //   if (user?.pass.trim().length < 5) {
  //     isValid = false;
  //     catenameErr.uname =
  //       'Please enter valid password or length greater than 5';
  //   }
  //   setErrorMessages(catenameErr);
  //   return isValid;
  // };

  // console.log('users', user);
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Name </label>
          <input
            type="text"
            name="name"
            required
            value={user?.name}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.name}</div>
        </div>
        <div className={styles.input_container}>
          <label>Username </label>
          <input
            type="text"
            value={user?.uname}
            name="uname"
            required
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.uname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input
            value={user?.email}
            type="text"
            name="email"
            required
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.email}</div>
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            value={user?.pass}
            type="password"
            name="pass"
            required
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.pass}</div>
        </div>
        <div className={styles.input_container}>
          <label>Phone number </label>
          <input
            type="text"
            value={user?.phone}
            onChange={(e) => handleChange(e)}
            name="phone"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.uname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Address </label>
          <input
            type="text"
            value={user?.address}
            onChange={(e) => handleChange(e)}
            name="address"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.address}</div>
        </div>
        <div className={styles.input_container}>
          <label>Qualification </label>
          <input
            type="text"
            value={user?.qualification}
            onChange={(e) => handleChange(e)}
            name="qualification"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.qualification}</div>
        </div>
        <div className={styles.input_container}>
          <label>Technology </label>
          <input
            type="text"
            value={user?.technology}
            onChange={(e) => handleChange(e)}
            name="technology"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.technology}</div>
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            CREATE ACCOUNT
          </Button>
        </div>
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
            onClick={() => router.push('/')}
          >
            Back To Login
          </Typography>
        </Box>
        {/* <div className={styles.button_container}>
          <p>Create account for {val === 0 ? 'Student' : 'Expert'}</p>
        </div> */}
      </form>
    </div>
  );
  return (
    <div className={styles.app}>
      <div className={val === 0 ? styles.login_form1 : styles.login_form1}>
        <div className={styles.title}>
          <span
            style={{
              color: val === 0 && 'blue',
              borderBottom: val === 0 && '1px solid blue',
            }}
            onClick={() => setVal(0)}
          >
            Student Signup
          </span>
          &nbsp;
          <span
            style={{
              color: val === 1 && 'blue',
              borderBottom: val === 1 && '1px solid blue',
            }}
            onClick={() => setVal(1)}
          >
            Expert Signup
          </span>
        </div>
        {val === 0 ? (
          //   <h1>student signui</h1>
          <StudentPage
            val={val}
            user1={user1}
            setUser1={setUser1}
            errorMessages1={errorMessages1}
            setErrorMessages1={setErrorMessages1}
          />
        ) : (
          //   <h1>Expert signui</h1>
          renderForm
        )}
      </div>
    </div>
  );
};

export default Login;
