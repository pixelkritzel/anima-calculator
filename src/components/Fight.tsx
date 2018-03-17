import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Row } from 'react-bootstrap';

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
            <FormGroup controlId="addCharacterToFight">
              <ControlLabel>Add character to fight:</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                inputRef={ref => (this.addCharacterToFightSelectRef = ref)}
              >
                {appStore.charactersNotInFight.map(char => (
                  <option key={`add-character-to-fight-${char.name}`} value={char.name}>
                    {char.name}
                  </option>
                ))}
              </FormControl>
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
