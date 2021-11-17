import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { store } from '../../../state/store';
import Layout from '../../global/Layout/Layout';

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
        <Layout>{children}</Layout>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
