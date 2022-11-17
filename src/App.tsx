import { useState } from 'react';

import { TDish } from './types/FormTypes';

import useFetch from './hooks/useFetch';
import formatMessage from './utils/formatMessage';

import Form from './Form';

const App = () => {
  const [data, setData] = useState<TDish>({});

  const URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes';

  const { message, isSuccess, isError } = useFetch({ url: URL, data });

  return (
    <div className='container'>
      <main className='main'>
        <h2 className='main__title'>Enter information about the dish</h2>

        <Form setData={setData} />
      </main>

      <p className={`message ${isSuccess ? 'message--success' : isError ? 'message--error' : ''}`}>
        {formatMessage(message)}
      </p>
    </div>
  );
};

export default App;
