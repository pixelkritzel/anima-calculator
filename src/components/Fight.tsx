import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FightTable from './FightTable';

import { appStore } from '../store';

@observer
class Fight extends React.Component {
  @observable selectedCharacter: string | undefined;

  onAddCharacterToFight = () => {
    if (this.selectedCharacter) {
      appStore.addCharacterToFight(this.selectedCharacter);
      this.selectedCharacter = undefined;
    }
  };

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs>
            <form>
              <FormGroup>
                <InputLabel htmlFor="add-character-to-fight">Add character to fight:</InputLabel>
                <Select
                  value={this.selectedCharacter}
                  onChange={event => (this.selectedCharacter = event.target.value)}
                  inputProps={{
                    id: 'add-character-to-fight'
                  }}
                >
                  {appStore.charactersNotInFight.map(char => (
                    <MenuItem key={`add-character-to-fight-${char.id}`} value={char.name}>
                      {char.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <Button onClick={this.onAddCharacterToFight}>Add</Button>
            </form>
          </Grid>
          <Grid item xs>
            <Button disabled={}>Start turn</Button>
            <Button>New Turn</Button>
          </Grid>
        </Grid>

        <FightTable />
      </>
    );
  }
}

export default Fight;
