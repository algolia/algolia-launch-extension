import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, lightTheme } from '@adobe/react-spectrum';
import './global.styl';

export default (View) => {
  ReactDOM.render(
    <Provider colorScheme="light" theme={lightTheme}>
      <View />
    </Provider>,
    document.getElementById('content')
  );
};
