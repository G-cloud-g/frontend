import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import StudentPage from './Studentsignupform';
const baseURL = 'http://localhost:3001';
const Login = () => {
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({});
  const [val, setVal] = useState(0);
  const [user1, setUser1] = useState({});
  const [errorMessages1, setErrorMessages1] = useState({});
  useEffect(() => {
    if (!val === 0) {
      setUser({});
      setErrorMessages({});
      console.log('data cc', user);
    } else {
      setUser1({});
      setErrorMessages({});
      console.log('data cc', user1);
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
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.name}</div>
        </div>
        <div className={styles.input_container}>
          <label>Username </label>
          <input
            type="text"
            value={user.uname}
            name="uname"
            required
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.uname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input
            value={user.email}
            type="text"
            name="email"
            required
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.email}</div>
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            value={user.pass}
            type="password"
            name="pass"
            required
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages.pass}</div>
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            CREATE ACCOUNT
          </Button>
        </div>
        {/* <div className={styles.button_container}>
          <p>Create account for {val === 0 ? 'Student' : 'Expert'}</p>
        </div> */}
      </form>
    </div>
  );
  return (
    <div className={styles.app}>
      <div className={val === 0 ? styles.login_form1 : styles.login_form}>
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
