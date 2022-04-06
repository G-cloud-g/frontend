import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import StudentLogin from './StudentLogin';
import ExpertLogin from './ExpertLogin';
const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [errorMessages1, setErrorMessages1] = useState({});
  const [Student, setStudent] = useState({ uname: '', pass: '' });
  const [Expert, setExpert] = useState({ uname: '', pass: '' });
  const [val, setVal] = useState(0);

  // JSX code for login form
  // const renderForm = (
  //   <div className={styles.form}>
  //     <form onSubmit={handleSubmit}>
  //       <div className={styles.input_container}>
  //         <label>Username </label>
  //         <input type="text" name="uname" required />
  //         {renderErrorMessage('uname')}
  //       </div>
  //       <div className={styles.input_container}>
  //         <label>Password </label>
  //         <input type="password" name="pass" required />
  //         {renderErrorMessage('pass')}
  //       </div>
  //       <div className={styles.button_container}>
  //         {/* <input type="submit" /> */}
  //         <Button variant="contained" color="primary">
  //           Login
  //         </Button>
  //       </div>
  //       <div className={styles.button_container}>
  //         <p>
  //           Create account{' '}
  //           <Link href="/signup">
  //             <a style={{ color: 'blue', textDecoration: 'underline' }}>
  //               {/* {val === 0 ? 'Student' : 'Expert'} */} click here
  //             </a>
  //           </Link>
  //         </p>
  //         <p>
  //           <Link href="/forgotpassword">
  //             <a style={{ color: 'blue', textDecoration: 'underline' }}>
  //               Forgot password?
  //             </a>
  //           </Link>
  //         </p>
  //       </div>
  //     </form>
  //   </div>
  // );
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
        {val === 0 ? (
          <StudentLogin
            val={val}
            setVal={setVal}
            Student={Student}
            setStudent={setStudent}
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
          />
        ) : (
          <ExpertLogin
            val={val}
            setVal={setVal}
            Expert={Expert}
            setExpert={setExpert}
            errorMessages1={errorMessages1}
            setErrorMessages1={setErrorMessages1}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
