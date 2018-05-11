import * as React from 'react';

import { observer } from 'mobx-react';

import { Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaCheck } from 'react-icons/lib/fa';

import { ICharakterInFightModel } from '../store/charakterInFightModel';
import { observable } from 'mobx';

type ICharactersTableRowProps = {
  character: ICharakterInFightModel;
  index: number;
  key: string;
};

@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  @observable showModifierForm = false;

  @observable
  modifier = {
    value: 0,
    reason: ''
  };

  renderModifierForm() {
    return (
      <Form>
        <FormGroup>
          <Label>Modfier value</Label>
          <Input type="number" onChange={event => (this.modifier.value = parseInt(event.target.value, 10))} />
        </FormGroup>
        <FormGroup>
          <Label>Modfier reason</Label>
          <Input type="text" onChange={event => (this.modifier.reason = event.target.value)} />
        </FormGroup>
        <Button
          onClick={() => {
            this.props.character.addModifier(this.modifier);
            this.showModifierForm = false;
          }}
        >
          <FaCheck /> Add modifier
        </Button>
      </Form>
    );
  }

  render() {
    const { character, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{character.baseCharacter.name}</td>
        <td>{character.baseCharacter.group} </td>
        <td>{character.baseCharacter.baseInitiative}</td>
        <td>
          {this.showModifierForm ? (
            this.renderModifierForm()
          ) : (
            <Button color="link" onClick={() => (this.showModifierForm = true)}>
              Add modifier
            </Button>
          )}
          <ul className="list-unstyled">
            {character.modifiers.map((mod, modIndex) => (
              <li key={`charakter-${index}-modifier-${mod.id}`}>
                {mod.value}
                {mod.reason && ' - '}
                {mod.reason}
                <Button color="link" onClick={() => character.removeModifier(mod.id)}>
                  &times;
                </Button>
              </li>
            ))}
          </ul>
        </td>
        <td>{character.d100}</td>
        <td>{character.currentInitiative}</td>
        <th>
          <ul>
            {character.advantageAgainst.map(opponent => (
              <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>opponent.baseCharacter.name</li>
            ))}
          </ul>
        </th>
        <th>
          <ButtonGroup>
            <Button onClick={character.rolld100}>Roll D100</Button>
            <Button color="danger">Delete</Button>
          </ButtonGroup>
        </th>
      </tr>
    );
  }
}

export default CharactersTableRow;
