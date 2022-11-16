import { useState } from 'react';

import useFetch from './hooks/useFetch';

import Form from './components/Form';

import { TDish } from './types/FormTypes';

const App = () => {
  const [data, setData] = useState<Partial<TDish>>({});

  const URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes';

  const { message, isSuccess, isFetching, isError } = useFetch({ url: URL, data });

  return (
    <>
      <Form setData={setData} />

      {isFetching && 'Fetching...'}
      {isSuccess && <p style={{ color: 'green' }}>{message}</p>}
      {isError && <p style={{ color: 'red' }}>{message}</p>}
    </>
  );
};

export default App;
