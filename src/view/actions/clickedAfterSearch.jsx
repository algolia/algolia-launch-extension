import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/clickedAfterSearch/fields';
import getConfigurationInitValues from './components/clickedAfterSearch/getInitValues';
import getConfigurationSettings from './components/clickedAfterSearch/getSettings';
import validateConfigurationFields from './components/clickedAfterSearch/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getConfigurationInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getConfigurationSettings(values)
    })}
    validate={(values) => ({
      ...validateConfigurationFields(values)
    })}
    render={() => (
      <>
        <ConfigurationFields />
      </>
    )}
  />
);
