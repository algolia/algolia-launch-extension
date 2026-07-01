import 'babel-polyfill';
import { lightTheme, Provider } from '@adobe/react-spectrum';
import React from 'react';
import ReactDOM from 'react-dom';
import './global.styl';

export default (View) => {
  ReactDOM.render(
    <Provider colorScheme="light" theme={lightTheme}>
      <View />
    </Provider>,
    document.getElementById('content')
  );
};
