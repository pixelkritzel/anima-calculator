import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { configure } from 'mobx';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CharactersView from 'components/CharactersView';
import FightView from 'components/FightView';
import SideMenu from 'components/SideMenu';

import { store } from 'store';

@observer
class App extends React.Component {
  constructor(props: any) {
    super(props);
    configure({
      enforceActions: 'never',
    });
  }

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

export default App;
