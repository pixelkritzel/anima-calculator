import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { isNull } from 'lodash';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconCheck from '@material-ui/icons/Check';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { IStore } from '#src/store';
import { ICharakterInFightModel } from '#src/store/charakterInFightModel';

const PlayerIniInput = observer(({ character }: { character: ICharakterInFightModel }) => (
  <TextField
    error={isNull(character.manualCurrentInitiative)}
    type="number"
    value={!isNull(character.manualCurrentInitiative) ? character.manualCurrentInitiative : ''}
    onChange={event => character.updateManualCurrentInitiative(Number(event.target.value))}
  />
));

type ICharactersTableRowProps = {
  character: ICharakterInFightModel;
  index: number;
  key: string;
  store?: IStore;
};

@inject('store')
@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  @observable
  showModifierForm = false;

  @observable
  modifier = {
    value: 0,
    reason: ''
  };

  saveModifier = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.character.addModifier(this.modifier);
    this.showModifierForm = false;
  };

  renderModifierForm() {
    return (
      <form onSubmit={this.saveModifier}>
        <TextField
          label="Modfier value"
          type="number"
          onChange={event => (this.modifier.value = parseInt(event.target.value, 10))}
        />

        <TextField label="Modfier reason" type="text" onChange={event => (this.modifier.reason = event.target.value)} />

        <Button onClick={this.saveModifier}>
          <IconCheck /> Add modifier
        </Button>
      </form>
    );
  }

  render() {
    const { character, index, store } = this.props;
    return (
      <TableRow selected={store!.fight.phase === 'turn' && store!.fight.activeCharacter === index}>
        <TableCell>
          <Checkbox checked={character.acted} onClick={character.toogleActed} />
        </TableCell>
        <TableCell>{index + 1}</TableCell>
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
        <TableCell>{character.baseCharacter.group === 'nsc' ? character.d100 : '-'}</TableCell>
        <TableCell>
          {character.baseCharacter.group === 'nsc' ? (
            character.currentInitiative
          ) : (
            <PlayerIniInput character={character} />
          )}
        </TableCell>
        <TableCell>
          <ul>
            {character.advantageAgainst.map(opponent => (
              <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>{opponent.baseCharacter.name}</li>
            ))}
          </ul>
        </TableCell>
        <TableCell>
          {character.baseCharacter.group === 'nsc' && <Button onClick={character.rolld100}>Roll D100</Button>}
          <Button color="secondary" onClick={() => store!.fight.removeCharacterFromFight(character)}>
            Remove Character from Fight
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default CharactersTableRow;
