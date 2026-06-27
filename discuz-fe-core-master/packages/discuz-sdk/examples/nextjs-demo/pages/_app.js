import '../styles/globals.css';
import api from '../api-entry';

function MyApp({ Component, pageProps }) {
  const params = {
    page: 1,
    perPage: 10,
    filter: {
      sticky: 0,
      essence: 1,
      // sort: 2,
      // attention: 1,
      // categoryids: [1, 2, 3],
    },
  };

  api.readThreadList({ params, timeout: 100 })
    .then(result => console.log('readThreadList', result))
    .catch((err) => {
      console.log(err);
    });

  return <Component {...pageProps} />;
}

export default MyApp;
