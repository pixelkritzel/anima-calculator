import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import { appStore } from '../store';

@observer
class CharacterAddForm extends React.Component {
  @observable
  characterScaffold = {
    name: '',
    group: 'player',
    baseInitiative: 0
  };

  render() {
    return (
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label>Character name</Label>
              <Input
                type="text"
                value={this.characterScaffold.name}
                placeholder="Character name"
                onChange={event => {
                  this.characterScaffold.name = event.target.value;
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Group</Label>
              <Input
                type="select"
                value={this.characterScaffold.group}
                onChange={event => {
                  this.characterScaffold.group = event.target.value;
                }}
              >
                <option value="player">Player</option>
                <option value="nsc">NSC</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Base initiative</Label>
              <Input
                type="number"
                value={this.characterScaffold.baseInitiative}
                placeholder="0"
                onChange={event => {
                  this.characterScaffold.baseInitiative = parseInt(event.target.value, 10);
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={() => appStore.addCharacter(this.characterScaffold)}>Add character</Button>
      </Form>
    );
  }
}

export default CharacterAddForm;
