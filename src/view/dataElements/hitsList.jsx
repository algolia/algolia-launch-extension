import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/hitsList/fields';
import getConfigurationInitValues from './components/hitsList/getInitValues';
import getConfigurationSettings from './components/hitsList/getSettings';
import validateConfigurationFields from './components/hitsList/validate';

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
