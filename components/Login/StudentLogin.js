import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const StudentLogin = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [val, setVal] = useState(0);

  return (
    <div className={styles.form}>
      <form>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="uname" required autoComplete="off" />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required autoComplete="off" />
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          <Button variant="contained" color="primary">
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
            <Link href="/forgotpassword">
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
