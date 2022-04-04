import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Login.module.css';
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
  const renderStudentForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>First name </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Last name </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Phone number </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>

        <div className={styles.input_container}>
          <label>Interest area</label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Address </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Qualification </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Technology </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.button_container}>
          <input type="submit" />
        </div>
        {/* <div className={styles.button_container}>
          <p>Create account for {val === 0 ? 'Student' : 'Expert'}</p>
        </div> */}
      </form>
    </div>
  );
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Name </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage('uname')}
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
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
        {val === 0
          ? //   <h1>student signui</h1>
            renderStudentForm
          : //   <h1>Expert signui</h1>
            renderForm}
      </div>
    </div>
  );
};

export default Login;
