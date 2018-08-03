import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FightTable from './FightTable';

import { appStore } from '../store';

@observer
class Fight extends React.Component {
  @observable
  selectedCharacter: string | undefined = appStore.charactersNotInFight[0] && appStore.charactersNotInFight[0].id;

  onAddCharacterToFight = () => {
    if (this.selectedCharacter) {
      appStore.addCharacterToFight(this.selectedCharacter);
      this.selectedCharacter = appStore.charactersNotInFight[0] && appStore.charactersNotInFight[0].id;
    }
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={6}>
          <form>
            <InputLabel htmlFor="add-character-to-fight">Add character to fight:</InputLabel>
            <Select
              value={this.selectedCharacter}
              onChange={event => (this.selectedCharacter = event.target.value)}
              inputProps={{
                id: 'add-character-to-fight'
              }}
            >
              {appStore.charactersNotInFight.map(char => (
                <MenuItem key={`add-character-to-fight-${char.id}`} value={char.id}>
                  {char.name}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={this.onAddCharacterToFight}>Add</Button>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Button disabled={!appStore.fight.isFightAble} onClick={appStore.fight.newTurn}>
            New Turn
          </Button>
          <Button disabled={!appStore.fight.isFightStartable} onClick={appStore.fight.startTurn}>
            Start turn
          </Button>
          <Button disabled={appStore.fight.phase === 'new'} onClick={appStore.fight.nextCharacter}>
            Next Character
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FightTable />
        </Grid>
      </Grid>
    );
  }
}

export default Fight;
