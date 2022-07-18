import { useEffect, useState } from 'react';

const useInit = (callback: any, ...args: any[]) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init) {
      setInit(true);
      callback(...args);
    }
  }, [init, callback, args]);
  const resetInit = () => {
    setInit(false);
  };
  return [resetInit];
};

export { useInit };
