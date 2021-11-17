import { createStyles, makeStyles } from '@mui/styles';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { store } from '../../../state/store';
import Layout from '../../global/Layout/Layout';

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  const useStyles = makeStyles(() =>
    createStyles({
      '@global': {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
        },
        '#__next': {
          height: '100%',
          width: '100%',
        },
      },
    }),
  );
  useStyles();

  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong!</div>}>
        <Layout>{children}</Layout>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
