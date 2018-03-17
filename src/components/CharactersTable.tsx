import * as React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { appStore } from '../store';

import CharacterTableRow from './CharacterTableRow';
import Modal from './Modal';

@observer
class CharactersTable extends React.Component {
  @observable showAddUserForm = false;

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Table striped={true} bordered={true} condensed={true} hover={true}>
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
          <Button onClick={() => (this.showAddUserForm = true)}>Add character</Button>
          {this.showAddUserForm && <Modal onClose={() => (this.showAddUserForm = false)}>Add user form</Modal>}
        </Col>
      </Row>
    );
  }
}

export default CharactersTable;
