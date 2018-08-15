import * as React from 'react';
import { observer, Provider } from 'mobx-react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CharactersView from '#src/components/CharactersView';
import FightView from '#src/components/FightView';
import SideMenu from '#src/components/SideMenu';

import { store } from '#src/store';

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <>
          <SideMenu />
          <div className="content">
            <Tabs
              value={store.activeTab}
              onChange={(_, value) => store.setActiveTab(value)}
              indicatorColor="primary"
              textColor="primary"
              centered={true}
            >
              <Tab label="Characters" value="charactersView" />
              <Tab label="Fight" value="fightView" />
            </Tabs>
            {store.activeTab === 'charactersView' && <CharactersView />}
            {store.activeTab === 'fightView' && <FightView />}
          </div>
        </>
      </Provider>
    );
  }
}
