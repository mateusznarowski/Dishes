const formatMessage = (message: string | object) => {
  if (typeof message === 'string') return message;

  const error = Object.keys(message)[0].replaceAll('_', ' ');
  const errorMessage = Object.values(message)[0];

  return `${error.charAt(0).toUpperCase() + error.slice(1)}: ${errorMessage}`;
};

export default formatMessage;
