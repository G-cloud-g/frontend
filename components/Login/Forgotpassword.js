import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Forgot = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [val, setVal] = useState(0);
  // User Login info
  const database = [
    {
      username: 'user1',
      password: 'pass1',
    },
    {
      username: 'user2',
      password: 'pass2',
    },
  ];

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

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
          />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.button_container}>
          {/* <input type="submit" /> */}
          {/* <button onClick={handleSubmit}>RESET YOUR PASSWORD</button> */}
          <Button variant="contained" color="primary">
            RESET YOUR PASSWORD
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
