import 'babel-polyfill';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import React from 'react';
import ReactDOM from 'react-dom';
import './global.styl';

export default (View) => {
  ReactDOM.render(
    <Provider
      theme={defaultTheme}
      colorScheme="light"
      UNSAFE_style={{ background: 'transparent' }}
    >
      <View />
    </Provider>,
    document.getElementById('content')
  );
};
