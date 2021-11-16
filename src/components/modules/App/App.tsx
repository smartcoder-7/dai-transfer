import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from '../../global/Layout/Layout';

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <Box>
      <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
        <Layout>{children}</Layout>
      </ErrorBoundary>
    </Box>
  );
}

export default App;
