import * as React from 'react';
import { Col, Row, Table } from 'reactstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { appStore } from '../store';

import CharacterTableRow from './CharacterTableRow';
import CaracterAddForm from './CaracterAddForm';

@observer
class CharactersTable extends React.Component {
  @observable showAddUserForm = false;

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Table striped={true} bordered={true} hover={true}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Group</th>
                  <th>Base Initiative</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appStore.characters.map((character, index: number) => (
                  <CharacterTableRow key={`charakter-${index}`} index={index} character={character} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <CaracterAddForm />
      </div>
    );
  }
}

export default CharactersTable;
