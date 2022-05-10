import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { Provider } from 'react-redux';
import store from '/src/Redux/store';
import SnackBar from '/src/utils/SnackBar';
import { useRouter } from 'next/router';
import ConfirmationModal from '../src/utils/ConfirmationModal';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/');
    else router.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Expert Advice</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <SnackBar />
          <ConfirmationModal>
            <Component {...pageProps} />
          </ConfirmationModal>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
