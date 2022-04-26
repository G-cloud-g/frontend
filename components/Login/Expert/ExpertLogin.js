import { useEffect, useState } from 'react';
import styles from '../../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const baseURL = 'http://localhost:3001';
const ExpertLogin = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { val, Expert, setExpert, errorMessages1, setErrorMessages1 } = props;
  useEffect(() => {
    if (val === 1) {
      setExpert({ uname: '', pass: '' });
      setErrorMessages1({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const handleSubmit = async () => {
    const isValid = validateFn();

    if (isValid == true) {
      if (val === 1) {
        const { uname, pass } = Expert;
        const userdata = {
          UserName: uname,
          password: pass,
        };
        // console.log('expert cred ', userdata);

        await axios
          .post(
            `${baseURL}/expert/login`,
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
            localStorage.setItem('UserType', userType);
            localStorage.setItem('token', token);
            router.push('/dashboard');
          })
          .catch((err) => {
            // console.log('err ', err.response.data);
            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: err.response.data.message,
                type: 'error',
              },
            });
          });
      }
    }
  };

  const validateFn = () => {
    const catenameErr = {};
    let isValid = true;
    if (Expert.uname.trim().length < 1) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid username or length greater than 4';
    }
    if (Expert.pass.trim().length < 1) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid password or length greater than 5';
    }
    setErrorMessages1(catenameErr);
    return isValid;
  };
  return (
    <div className={styles.form}>
      <form>
        <div className={styles.input_container}>
          <label>Username </label>
          <input
            type="text"
            value={Expert.uname}
            onChange={(e) =>
              setExpert({ ...Expert, [e.target.name]: e.target.value })
            }
            name="uname"
            required
            autoComplete="off"
            placeholder="username"
          />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            type="password"
            value={Expert.pass}
            onChange={(e) =>
              setExpert({ ...Expert, [e.target.name]: e.target.value })
            }
            name="pass"
            required
            placeholder="password"
            autoComplete="off"
          />
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </div>
        <div className={styles.button_container}>
          <p>
            Create account{' '}
            <Link href="/signup">
              <a style={{ color: 'blue', textDecoration: 'underline' }}>
                {/* {val === 0 ? 'Student' : 'Expert'} */} click here
              </a>
            </Link>
          </p>
          <p>
            <Link href="/forgotpass/expert">
              <a style={{ color: 'blue', textDecoration: 'underline' }}>
                Forgot password?
              </a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ExpertLogin;
