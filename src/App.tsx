import * as React from 'react';
import { observer } from 'mobx-react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CharactersTable from './components/CharactersTable';
import Fight from './components/Fight';
import SideMenu from './components/SideMenu';

import { appStore } from './store';

// declare var JssProvider: any; // tslint:disable-line
// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider'; // tslint:disable-line
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c'
});

@observer
class App extends React.Component {
  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <>
          <SideMenu />
          <div className="content">
            <Tabs
              value={appStore.activeTab}
              onChange={(_, value) => appStore.setActiveTab(value)}
              indicatorColor="primary"
              textColor="primary"
              centered={true}
            >
              <Tab label="Characters" value="charactersPane" />
              <Tab label="Fight" value="fightPane" />
            </Tabs>
            {appStore.activeTab === 'charactersPane' && <CharactersTable />}
            {appStore.activeTab === 'fightPane' && <Fight />}
          </div>
        </>
      </JssProvider>
    );
  }
}

export default App;
