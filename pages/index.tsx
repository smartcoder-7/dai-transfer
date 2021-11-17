import { GetServerSideProps } from 'next';

import { backendGetTokenPrices } from '../src/backend/getTokenPrices';
import HomeContainer, {
  HomeProps,
} from '../src/components/pages/Home/HomeContainer';
import { COINBASE_API_URL } from '../src/constants';

const TOKEN_NAMES = ['dai', 'ethereum'];
const USD = 'usd';

function Home(props: HomeProps) {
  return <HomeContainer {...props} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const repsonse = await backendGetTokenPrices({
    baseUrl: COINBASE_API_URL,
    query: {
      ids: TOKEN_NAMES.join(','),
      vs_currencies: USD,
    },
  });

  return {
    props: {
      ...repsonse,
    },
  };
};

export default Home;
