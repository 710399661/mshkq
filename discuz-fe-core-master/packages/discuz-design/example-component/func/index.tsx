import React, { useState } from 'react';
import getRenderComponent from './layouts';
import getAdapterHooks from './adapters';

const RenderComponent = getRenderComponent();
const useAdapter = getAdapterHooks();

const Func = () => {
  const { abc } = useAdapter();
  return <RenderComponent onClick={abc} />;
};

export default Func;
