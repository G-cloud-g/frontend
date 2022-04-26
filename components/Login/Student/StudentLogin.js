import { useEffect } from 'react';
import styles from '../../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
const baseURL = 'http://localhost:3001';
const StudentLogin = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { val, Student, setStudent, errorMessages, setErrorMessages } = props;
  useEffect(() => {
    if (val === 1) {
      setStudent({ uname: '', pass: '' });
      setErrorMessages({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const handleSubmit = async () => {
    const isValid = validateFn();

    if (isValid == true) {
      if (val === 0) {
        const { uname, pass } = Student;
        const userdata = {
          username: uname,
          password: pass,
        };
        await axios
          .post(
            `${baseURL}/student/login`,
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
    }
  };

  const validateFn = () => {
    const catenameErr = {};
    let isValid = true;
    if (Student.uname.trim().length < 4) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid username or length greater than 4';
    }
    if (Student.pass.trim().length < 5) {
      isValid = false;
      catenameErr.uname =
        'Please enter valid password or length greater than 5';
    }
    setErrorMessages(catenameErr);
    return isValid;
  };
  return (
    <div className={styles.form}>
      <form>
        <div className={styles.input_container}>
          <label>Username </label>
          <input
            type="text"
            value={Student.uname}
            onChange={(e) =>
              setStudent({ ...Student, [e.target.name]: e.target.value })
            }
            name="uname"
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            type="password"
            value={Student.pass}
            onChange={(e) =>
              setStudent({ ...Student, [e.target.name]: e.target.value })
            }
            name="pass"
            required
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
                {/* {val === 0 ? 'Student' : 'Student'} */} click here
              </a>
            </Link>
          </p>
          <p>
            <Link href="/forgotpass/student">
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

export default StudentLogin;
