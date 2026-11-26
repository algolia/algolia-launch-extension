import React from 'react';
import ExtensionView from '../components/extensionView';
import ConfigurationFields from './components/elementAttributeMap/fields';
import getConfigurationInitValues from './components/elementAttributeMap/getInitValues';
import getConfigurationSettings from './components/elementAttributeMap/getSettings';
import validateConfigurationFields from './components/elementAttributeMap/validate';

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
