import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/hitsListChanged/fields';
import getConfigurationInitValues from './components/hitsListChanged/getInitValues';
import getConfigurationSettings from './components/hitsListChanged/getSettings';
import validateConfigurationFields from './components/hitsListChanged/validate';

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
