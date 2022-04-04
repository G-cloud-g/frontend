import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [val, setVal] = useState(0);
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
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <div className={styles.button_container}>
          <input type="submit" />
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
  return (
    <div className={styles.app}>
      <div className={styles.login_form}>
        <div className={styles.title}>
          <span
            style={{
              color: val === 0 && 'blue',
              borderBottom: val === 0 && '1px solid blue',
            }}
            onClick={() => setVal(0)}
          >
            Student Login
          </span>
          &nbsp;
          <span
            style={{
              color: val === 1 && 'blue',
              borderBottom: val === 1 && '1px solid blue',
            }}
            onClick={() => setVal(1)}
          >
            Expert Login
          </span>
        </div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Login;
