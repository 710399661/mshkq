import React, { useCallback } from 'react';

export const useMiniAdapter = () => {
  const abc = useCallback(() => {
    console.log(123);
  }, []);

  return {
    abc,
  };
};
