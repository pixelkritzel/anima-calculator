import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from '#src/registerServiceWorker';

// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider'; // tslint:disable-line
import { createGenerateClassName } from '@material-ui/core/styles';

import '#src/stylesheets/style.css';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

ReactDOM.render(
  <JssProvider generateClassName={generateClassName}>
    <App />
  </JssProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
