import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const baseURL = 'http://localhost:3001';
const StudentPage = () => {
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({});
  const [val] = useState(0);
  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };
  useEffect(() => {
    if (val === 0) {
      setUser({});
      setErrorMessages({});
      console.log('data cc', user);
    }
  }, [val]);
  const handleSubmit = () => {
    const isValid = validateFn();

    if (isValid == true) {
      if (val === 1) {
        const { name, uname, email, pass } = user;
        const userdata = {
          name: name,
          username: uname,
          email: email,
          password: pass,
        };
        // console.log('expert cred ', user);
        try {
          axios
            .post(
              `${baseURL}/expert/signup`,
              userdata
              // user,
            )
            .then((response) => {
              dispatch({
                type: 'UPDATE_SNACK',
                payload: {
                  snackbar: true,
                  message: 'User created successfully',
                  type: 'success',
                },
              });
            })
            .catch((err) => {
              dispatch({
                type: 'UPDATE_SNACK',
                payload: {
                  snackbar: true,
                  message: err.data.message,
                  type: 'error',
                },
              });
            });
        } catch {
          dispatch({
            type: 'UPDATE_SNACK',
            payload: {
              snackbar: true,
              message: 'User created successfully',
              type: 'success',
            },
          });
        }
      }
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );
  const validateFn = () => {
    const catenameErr = {};
    let isValid = true;
    const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (user.name == null || user.name.trim() == '' || user.name == undefined) {
      isValid = false;
      catenameErr.name = 'Please enter Name';
    }
    if (!re.test(user.email) && catenameErr) {
      isValid = false;
      catenameErr.email = 'Please enter valid email';
    }
    if (user.uname.trim().length < 4) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid username or length greater than 4';
    }
    if (user.pass.trim().length < 5) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid password or length greater than 5';
    }
    setErrorMessages(catenameErr);
    return isValid;
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>First name </label>
          <input type="text" name="fname" required autoComplete="off" />
          {renderErrorMessage('uname1')}
        </div>
        <div className={styles.input_container}>
          <label>Last name </label>
          <input type="text" name="lname" required autoComplete="off" />
          {renderErrorMessage('uname1')}
        </div>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="uname1" required autoComplete="off" />
          {renderErrorMessage('uname1')}
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input type="text" name="email1" required autoComplete="off" />
          {renderErrorMessage('email1')}
        </div>
        <div className={styles.input_container}>
          <label>Phone number </label>
          <input type="text" name="phone" required autoComplete="off" />
          {renderErrorMessage('phone')}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass1" required autoComplete="off" />
          {renderErrorMessage('pass1')}
        </div>

        <div className={styles.input_container}>
          <label>Interest area</label>
          <input type="text" name="area" required autoComplete="off" />
          {renderErrorMessage('area')}
        </div>
        <div className={styles.input_container}>
          <label>Address </label>
          <input type="text" name="address" required autoComplete="off" />
          {renderErrorMessage('address')}
        </div>
        <div className={styles.input_container}>
          <label>Qualification </label>
          <input type="text" name="qualification" required autoComplete="off" />
          {renderErrorMessage('qualification')}
        </div>
        <div className={styles.input_container}>
          <label>Technology </label>
          <input type="text" name="technology" required autoComplete="off" />
          {renderErrorMessage('technology')}
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          <Button variant="contained" color="primary">
            CREATE ACCOUNT
          </Button>
        </div>
        {/* <div className={styles.button_container}>
          <p>Create account for {val === 0 ? 'Student' : 'Expert'}</p>
        </div> */}
      </form>
    </div>
  );
};

export default StudentPage;
