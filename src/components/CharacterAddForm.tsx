import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
      <form>
        <TextField
          label="Character name"
          type="text"
          value={this.characterScaffold.name}
          placeholder="Character name"
          onChange={event => {
            this.characterScaffold.name = event.target.value;
          }}
        />
        <FormControl>
          <InputLabel htmlFor="select-character-group">Group</InputLabel>

          <Select
            value={this.characterScaffold.group}
            onChange={event => {
              this.characterScaffold.group = event.target.value;
            }}
            inputProps={{
              id: 'select-character-group'
            }}
          >
            <MenuItem value="player">Player</MenuItem>
            <MenuItem value="nsc">NSC</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Base initiative"
          type="number"
          value={this.characterScaffold.baseInitiative}
          placeholder="0"
          onChange={event => {
            this.characterScaffold.baseInitiative = parseInt(event.target.value, 10);
          }}
        />

        <Button onClick={() => appStore.addCharacter(this.characterScaffold)}>Add character</Button>
      </form>
    );
  }
}

export default CharacterAddForm;
