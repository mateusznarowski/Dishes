import { useEffect, useState } from 'react';

type TUseFetch = {
  url: string;
  data: object;
};

type TStatus = {
  isSuccess: boolean;
  isError: boolean;
  message: string | object;
};

const useFetch = ({ url, data }: TUseFetch) => {
  const initialStatus = { isSuccess: false, isError: false, message: '' };

  const [status, setStatus] = useState<TStatus>(initialStatus);

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);

      if (response.ok) {
        setStatus((prev) => ({ ...prev, isSuccess: true, message: 'Successfully sent' }));
      } else {
        const errorMessage = JSON.parse(await response.text());

        setStatus((prev) => ({ ...prev, isError: true, message: errorMessage }));
      }
    };

    setTimeout(() => {
      setStatus((prev) => ({ ...prev, isError: false, isSuccess: false }));
    }, 5000);

    setTimeout(() => {
      setStatus(initialStatus);
    }, 5500);

    if (JSON.stringify(data) !== '{}') {
      fetchData();
    }
  }, [data]);

  return { ...status };
};

export default useFetch;
