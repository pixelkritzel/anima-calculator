import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, Input, Label, Form, FormGroup, Row } from 'reactstrap';

import FightTable from './FightTable';

import { appStore } from '../store';

@observer
class Fight extends React.Component {
  addCharacterToFightSelectRef: HTMLInputElement;

  onAddCharacterToFight = () => {
    if (this.addCharacterToFightSelectRef && this.addCharacterToFightSelectRef.value) {
      appStore.addCharacterToFight(this.addCharacterToFightSelectRef.value);
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Form inline={true}>
            <FormGroup>
              <Label>Add character to fight:</Label>
              <Input
                type="select"
                name="select"
                placeholder="select"
                innerRef={(ref: HTMLInputElement) => (this.addCharacterToFightSelectRef = ref)}
              >
                {appStore.charactersNotInFight.map(char => (
                  <option key={`add-character-to-fight-${char.id}`} value={char.name}>
                    {char.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button onClick={this.onAddCharacterToFight}>Add</Button>
          </Form>
        </Row>
        <Row>
          <FightTable />
        </Row>
      </div>
    );
  }
}

export default Fight;
