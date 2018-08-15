import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { appStore } from '#src/store';

const characterScaffold = {
  name: '',
  group: 'player',
  baseInitiative: 0
};

@observer
class CharacterAddForm extends React.Component {
  @observable
  character = characterScaffold;

  @observable
  message = '';

  @observable
  nameErrorMessage = '';

  addCharacter = () => {
    if (!this.character.name.trim()) {
      this.nameErrorMessage = 'You need to provide a name';
      return;
    } else {
      this.nameErrorMessage = '';
    }
    appStore.addCharacter(this.character);
    this.character = characterScaffold;
    this.message = 'Character added';
    setTimeout(() => (this.message = ''), 3000);
  };

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.character.name = event.target.value;
    if (this.character.name.trim() && this.nameErrorMessage) {
      this.nameErrorMessage = '';
    }
  };

  render() {
    return (
      <>
        <Typography className="add-character-success" color="primary">
          {this.message}
        </Typography>
        <form>
          <FormControl fullWidth margin="normal">
            <TextField
              error={!!this.nameErrorMessage}
              helperText={this.nameErrorMessage}
              label="Character name"
              type="text"
              value={this.character.name}
              placeholder="Character name"
              onChange={this.onNameChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="select-character-group">Group</InputLabel>
            <Select
              value={this.character.group}
              onChange={event => {
                this.character.group = event.target.value;
              }}
              inputProps={{
                id: 'select-character-group'
              }}
            >
              <MenuItem value="player">Player</MenuItem>
              <MenuItem value="nsc">NSC</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Base initiative"
              type="number"
              value={this.character.baseInitiative}
              placeholder="0"
              onChange={event => {
                this.character.baseInitiative = parseInt(event.target.value, 10);
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button onClick={this.addCharacter}>Add character</Button>
          </FormControl>
        </form>
      </>
    );
  }
}

export default CharacterAddForm;
