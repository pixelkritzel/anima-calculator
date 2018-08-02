import * as React from 'react';

import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

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
      <form>
        <TextField
          label="Modfier value"
          type="number"
          onChange={event => (this.modifier.value = parseInt(event.target.value, 10))}
        />

        <TextField label="Modfier reason" type="text" onChange={event => (this.modifier.reason = event.target.value)} />

        <Button
          onClick={() => {
            this.props.character.addModifier(this.modifier);
            this.showModifierForm = false;
          }}
        >
          <FaCheck /> Add modifier
        </Button>
      </form>
    );
  }

  render() {
    const { character, index } = this.props;
    return (
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>{character.baseCharacter.name}</TableCell>
        <TableCell>{character.baseCharacter.group} </TableCell>
        <TableCell>{character.baseCharacter.baseInitiative}</TableCell>
        <TableCell>
          {this.showModifierForm ? (
            this.renderModifierForm()
          ) : (
            <Button variant="text" onClick={() => (this.showModifierForm = true)}>
              Add modifier
            </Button>
          )}
          <ul className="list-unstyled">
            {character.modifiers.map((mod, modIndex) => (
              <li key={`charakter-${index}-modifier-${mod.id}`}>
                {mod.value}
                {mod.reason && ' - '}
                {mod.reason}
                <Button variant="text" onClick={() => character.removeModifier(mod.id)}>
                  &times;
                </Button>
              </li>
            ))}
          </ul>
        </TableCell>
        <TableCell>{character.d100}</TableCell>
        <TableCell>{character.currentInitiative}</TableCell>
        <TableCell>
          <ul>
            {character.advantageAgainst.map(opponent => (
              <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>{opponent.baseCharacter.name}</li>
            ))}
          </ul>
        </TableCell>
        <TableCell>
          <Button onClick={character.rolld100}>Roll D100</Button>
          <Button color="secondary">Delete</Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default CharactersTableRow;
