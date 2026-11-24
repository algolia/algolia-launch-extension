import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/htmlAttribute/fields';
import getConfigurationInitValues from './components/htmlAttribute/getInitValues';
import getConfigurationSettings from './components/htmlAttribute/getSettings';
import validateConfigurationFields from './components/htmlAttribute/validate';

export default function () {
  return (
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
      render={() => <ConfigurationFields />}
    />
  );
}
