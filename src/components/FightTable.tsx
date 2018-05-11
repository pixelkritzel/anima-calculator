import * as React from 'react';
import { Col, Row, Table } from 'reactstrap';
import { observer } from 'mobx-react';

import { appStore } from '../store';

import FightTableRow from './FightTableRow';

@observer
class Charakter extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Table striped={true} bordered={true} hover={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Group</th>
                <th>Base Initiative</th>
                <th>Modifiers</th>
                <th>D100</th>
                <th>Current Initiative</th>
                <th>Advantage towards</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appStore.fight.fightingCharacters.map((character, index: number) => (
                <FightTableRow key={`charakter-${index}`} index={index} character={character} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default Charakter;
