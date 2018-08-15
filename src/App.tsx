import * as React from 'react';
import { observer } from 'mobx-react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider'; // tslint:disable-line
import { createGenerateClassName } from '@material-ui/core/styles';

import CharactersView from '#src/components/CharactersView';
import FightView from '#src/components/FightView';
import SideMenu from '#src/components/SideMenu';

import { appStore } from '#src/store';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
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
            {appStore.activeTab === 'charactersPane' && <CharactersView />}
            {appStore.activeTab === 'fightPane' && <FightView />}
          </div>
        </>
      </JssProvider>
    );
  }
}

export default App;
