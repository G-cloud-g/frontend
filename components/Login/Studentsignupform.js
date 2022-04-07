import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
//baseUrl for API calling
const baseURL = 'http://localhost:3001';
const StudentPage = (props) => {
  const dispatch = useDispatch();

  const { val, user1, setUser1, setErrorMessages1, errorMessages1 } = props;
  useEffect(() => {
    if (!val === 0) {
      setUser1({});
      setErrorMessages1({});
      console.log('data cc', user1);
    }
  }, [val]);
  const handleSubmit = () => {
    // const isValid = validateFn();
    // if (isValid == true) {
    if (val === 0) {
      // const {
      //   fname,
      //   lname,
      //   uname,
      //   email,
      //   phone,
      //   pass1,
      //   area,
      //   address,
      //   qualification,
      //   technology,
      // } = user1;
      const userdata = {
        firstname: user1.fname,
        lastname: user1.lname,
        username: user1.uname,
        email: user1.email,
        password: user1.pass1,
        phone: user1.phone,
        address: user1.address,
        qualification: user1.qualification,
        interestarea: user1.area,
        technology: user1.technology,
      };
      //Expert signup API calling

      try {
        axios
          .post(
            `${baseURL}/student/signup`,
            userdata
            // user1,
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
            router.push('/');
          })
          //Error handling

          .catch((err) => {
            dispatch({
              type: 'UPDATE_SNACK',
              payload: {
                snackbar: true,
                message: err.response.data.error.message,
                type: 'error',
              },
            });
          });
      } catch {
        dispatch({
          type: 'UPDATE_SNACK',
          payload: {
            snackbar: true,
            message: 'user1 created successfully',
            type: 'success',
          },
        });
      }
    }
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages1.name && (
      <div className={styles.error}>{errorMessages1.message}</div>
    );
  // const validateFn = () => {
  //   const catenameErr = {};
  //   let isValid = true;
  //   const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  //   if (
  //     user1.fname == null ||
  //     user1.fname.trim() == '' ||
  //     user1.fname == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.fname = 'Please enter first name';
  //   }
  //   if (
  //     user1.technology == null ||
  //     user1.technology.trim() == '' ||
  //     user1.technology == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.technology = 'Please enter  technology';
  //   }
  //   if (
  //     user1.lname == null ||
  //     user1.lname.trim() == '' ||
  //     user1.lname == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.lname = 'Please enter last name';
  //   }
  //   if (
  //     user1.address == null ||
  //     user1.address.trim() == '' ||
  //     user1.address == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.address = 'Please enter address';
  //   }
  //   if (
  //     user1.qualification == null ||
  //     user1.qualification.trim() == '' ||
  //     user1.qualification == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.qualification = 'Please enter qualification';
  //   }
  //   if (
  //     user1.area == null ||
  //     user1.area.trim() == '' ||
  //     user1.area == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.area = 'Please enter interestarea';
  //   }
  //   if (
  //     user1.phone == null ||
  //     user1.phone.trim() == '' ||
  //     user1.phone == undefined
  //   ) {
  //     isValid = false;
  //     catenameErr.area = 'Please enter phone';
  //   }
  //   if (!re.test(user1.email) && catenameErr) {
  //     isValid = false;
  //     catenameErr.email = 'Please enter valid email';
  //   }
  //   if (user1.uname.trim().length < 4) {
  //     isValid = false;
  //     catenameErr.uname =
  //       'Please enter valid user1name or length greater than 4';
  //   }
  //   if (user1.pass1.trim().length < 5) {
  //     isValid = false;
  //     catenameErr.pass1 =
  //       'Please enter valid password or length greater than 5';
  //   }
  //   setErrorMessages1(catenameErr);
  //   return isValid;
  // };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>First name </label>
          <input
            value={user1.fname}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            type="text"
            name="fname"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.fname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Last name </label>
          <input
            type="text"
            name="lname"
            value={user1.lname}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.lname}</div>
        </div>
        <div className={styles.input_container}>
          <label>username </label>
          <input
            type="text"
            name="uname"
            value={user1.uname}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.uname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input
            type="text"
            name="email"
            value={user1.email}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.email}</div>
        </div>
        <div className={styles.input_container}>
          <label>Phone number </label>
          <input
            type="text"
            value={user1.phone}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="phone"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.uname}</div>
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input
            type="password"
            value={user1.pass1}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="pass1"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.pass1}</div>
        </div>

        <div className={styles.input_container}>
          <label>Interest area</label>
          <input
            type="text"
            value={user1.area}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="area"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.area}</div>
        </div>
        <div className={styles.input_container}>
          <label>Address </label>
          <input
            type="text"
            value={user1.address}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="address"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.address}</div>
        </div>
        <div className={styles.input_container}>
          <label>Qualification </label>
          <input
            type="text"
            value={user1.qualification}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="qualification"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.qualification}</div>
        </div>
        <div className={styles.input_container}>
          <label>Technology </label>
          <input
            type="text"
            value={user1.technology}
            onChange={(e) =>
              setUser1({ ...user1, [e.target.name]: e.target.value })
            }
            name="technology"
            required
            autoComplete="off"
          />
          <div className={styles.error}>{errorMessages1.technology}</div>
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
};

export default StudentPage;
