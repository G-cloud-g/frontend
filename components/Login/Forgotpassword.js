import { useState, useEffect } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
const Forgot = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = props;
  const [type, setType] = useState(null);
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [val, setVal] = useState(0);
  // User Login info
  useEffect(() => {
    setType(user);
  }, [user]);
  // 625d3a9a1f9269478f944573

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    // console.log('url ', process.env.NEXT_PUBLIC_BASEURL_API);
    if (type === 'student') {
      await axios
        .post(
          `http://${process.env.NEXT_PUBLIC_BASEURL_API}/student/forgotpwd`,
          { email }
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
          router.push(`/reset/${type}`);
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
    } else {
      await axios
        .post(
          `http://${process.env.NEXT_PUBLIC_BASEURL_API}/expert/forgotpwd`,
          { email }
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
          router.push(`/reset/${type}`);
        })
        .catch((err) => {
          // console.log('err.response ', err.response);
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

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form>
        <div className={styles.input_container}>
          <label>Email Address </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {renderErrorMessage('uname')} */}
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          {/* <button onClick={handleSubmit}>RESET YOUR PASSWORD</button> */}
          <Button
            variant="contained"
            color="primary"
            disabled={email ? false : true}
            onClick={handleSubmit}
          >
            Generate Your OTP
          </Button>
        </div>
        <div className={styles.button_container}>
          <p>
            <Link href="/">
              <a style={{ color: 'blue', textDecoration: 'underline' }}>
                Login
              </a>
            </Link>
          </p>
          <p>
            <Link href="/signup">
              <a style={{ color: 'blue', textDecoration: 'underline' }}>
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
  return (
    <div className={styles.app}>
      <div className={styles.login_form}>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Forgot;
