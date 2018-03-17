import * as React from 'react';
import { Grid, Tab, Tabs } from 'react-bootstrap';

import Fight from './components/Fight';
import CharactersTable from './components/CharactersTable';

import './stylesheets/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Tabs defaultActiveKey="fight">
            <Tab eventKey="characters" title="Characters">
              <CharactersTable />
            </Tab>
            <Tab eventKey="fight" title="Fight">
              <Fight />
            </Tab>
          </Tabs>
        </Grid>
      </div>
    );
  }
}

export default App;
