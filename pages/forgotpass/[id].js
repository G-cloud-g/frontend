import Forgotpassword from '/components/Login/Forgotpassword';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  // console.log('reser id ', id);
  return (
    <>
      <Header user={id} />
      <Forgotpassword user={id} />
    </>
  );
}
