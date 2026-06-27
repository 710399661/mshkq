import React, { useCallback } from 'react';

export const useWebAdapter = () => {
  const abc = useCallback(() => {
    console.log('test');
  }, []);

  return {
    abc,
  };
};
