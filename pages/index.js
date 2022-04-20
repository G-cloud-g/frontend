import Header from '../components/Header';
import Login from '../components/Login/Login';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
export default function Home() {
  // const counter = useSelector((state) => state.feedback);
  // console.log('redux state ', counter);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({
  //     type: 'UPDATE_SNACK',
  //     payload: {
  //       snackbar: true,
  //       message: 'You do not a have Stripe ID',
  //       type: 'warning',
  //     },
  //   });
  // }, []);

  return (
    <>
      <Header />
      <Login />
    </>
  );
}
