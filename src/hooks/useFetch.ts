import { useEffect, useState } from 'react';

type TUseFetch = {
  url: string;
  data: object;
};

type TStatus = {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  message: string;
};

const useFetch = ({ url, data }: TUseFetch) => {
  const initialStatus = { isSuccess: false, isFetching: false, isError: false, message: '' };

  const [status, setStatus] = useState<TStatus>(initialStatus);

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);

      setStatus((prev) => ({ ...prev, isFetching: true }));

      if (response.ok) {
        setStatus((prev) => ({ ...prev, isFetching: false, isSuccess: true, message: 'Successfully sent' }));
      } else {
        const errorMessage = Object.values(JSON.parse(await response.text()));

        setStatus((prev) => ({ ...prev, isFetching: false, isError: true, message: `${errorMessage}` }));
      }
    };

    setTimeout(() => {
      setStatus(initialStatus);
    }, 3000);

    if (JSON.stringify(data) !== '{}') {
      fetchData();
    }
  }, [data]);

  return { ...status };
};

export default useFetch;
