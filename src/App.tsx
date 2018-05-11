import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import Fight from './components/Fight';
import CharactersTable from './components/CharactersTable';

import './stylesheets/bootstrap.css';
import './stylesheets/App.css';

@observer
class App extends React.Component {
  @observable activeTab = 'charactersPane';
  render() {
    return (
      <div>
        <Container>
          <Nav tabs={true}>
            <NavItem>
              <NavLink
                className={classnames({ active: this.activeTab === 'charactersPane' })}
                onClick={() => {
                  this.activeTab = 'charactersPane';
                }}
              >
                Characters
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.activeTab === 'fightPane' })}
                onClick={() => {
                  this.activeTab = 'fightPane';
                }}
              >
                Fight
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.activeTab}>
            <TabPane tabId={'charactersPane'}>
              <CharactersTable />
            </TabPane>
            <TabPane tabId={'fightPane'}>
              <Fight />
            </TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}

export default App;
