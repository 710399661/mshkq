import React, { useState } from 'react';
import getRenderComponent from './layouts';
import getAdapterHooks from './adapters';

const RenderComponent = getRenderComponent();
const useAdapter = getAdapterHooks();

const Tabs = props => <RenderComponent {...props} />;

Tabs.TabPanel = RenderComponent.TabPanel;

export default Tabs;
