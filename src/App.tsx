import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Fight from './components/Fight';
import CharactersTable from './components/CharactersTable';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

@observer
class App extends React.Component {
  @observable activeTab = 'charactersPane';

  render() {
    return (
      <>
        <Tabs
          value={this.activeTab}
          onChange={(_, value) => (this.activeTab = value)}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
        >
          <Tab label="Characters" value="charactersPane" />
          <Tab label="Fight" value="fightPane" />
        </Tabs>
        {this.activeTab === 'charactersPane' && <CharactersTable />}
        {this.activeTab === 'fightPane' && <Fight />}
      </>
    );
  }
}

export default App;
