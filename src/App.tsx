import * as React from 'react';
import { observer } from 'mobx-react';

import Fight from './components/Fight';
import CharactersTable from './components/CharactersTable';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { appStore } from './store';

@observer
class App extends React.Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
