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
        <form>
          <Grid container>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Button onClick={this.onAddCharacterToFight}>Add</Button>
            </Grid>
          </Grid>
        </form>

        <FightTable />
      </>
    );
  }
}

export default Fight;
