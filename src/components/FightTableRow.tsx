import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import IconCheck from '@material-ui/icons/Check';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import AppModal from '#src/components/AppModal';

import { IStore } from '#src/store';
import { ICharakterInFightModel } from '#src/store/charakterInFightModel';

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
  showModifierModal = false;

  @observable
  modifier = {
    value: 0,
    reason: ''
  };

  saveModifier = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.character.addModifier(this.modifier);
    this.showModifierModal = false;
  };

  renderModifierModal() {
    const { character } = this.props;
    return (
      <AppModal
        modalTitle={`Add modifier for ${character.baseCharacter.name}`}
        open
        onClose={() => (this.showModifierModal = false)}
      >
        <form onSubmit={this.saveModifier}>
          <FormControl fullWidth margin="normal">
            <TextField
              autoFocus
              label="Modfier reason"
              type="text"
              onChange={event => (this.modifier.reason = event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Modfier value"
              type="number"
              onChange={event => (this.modifier.value = parseInt(event.target.value, 10))}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button onClick={this.saveModifier}>
              <IconCheck /> Add modifier
            </Button>
          </FormControl>
        </form>
      </AppModal>
    );
  }

  render() {
    const { character, index, store } = this.props;
    return (
      <>
        {this.showModifierModal && this.renderModifierModal()}
        <TableRow selected={store!.fight.activeCharacter === index}>
          <TableCell>
            <Checkbox checked={character.acted} onClick={character.toogleActed} />
          </TableCell>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{character.baseCharacter.name}</TableCell>
          <TableCell>{character.baseCharacter.group} </TableCell>
          <TableCell>{character.baseCharacter.baseInitiative}</TableCell>
          <TableCell>
            <Button size="small" onClick={() => (this.showModifierModal = true)}>
              Add modifier
            </Button>
            <ul className="list-unstyled">
              {character.inititiaveModifiers.map((mod, modIndex) => (
                <li key={`charakter-${index}-modifier-${mod.id}`}>
                  {mod.value}
                  {mod.reason && ' - '}
                  {mod.reason}
                  <IconButton onClick={() => character.removeModifier(mod.id)}>&times;</IconButton>
                </li>
              ))}
            </ul>
          </TableCell>
          <TableCell>{character.d100}</TableCell>
          <TableCell>{character.currentInitiative}</TableCell>
          <TableCell>
            <ul>
              {character.advantageAgainst.map(opponent => (
                <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>
                  {opponent.baseCharacter.name}
                </li>
              ))}
            </ul>
          </TableCell>
          <TableCell>
            <Button onClick={character.rolld100}>Roll D100</Button>
            <br />
            <Button color="secondary" onClick={() => store!.fight.removeCharacterFromFight(character)}>
              Remove Character from Fight
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  }
}

export default CharactersTableRow;
