import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from 'registerServiceWorker';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'stylesheets/style.css';

ReactDOM.render(
  <App />,

  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
