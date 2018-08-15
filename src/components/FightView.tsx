import * as React from 'react';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';

import AddButton from './AddButton';
import AppModal from './AppModal';
import FightAddCharacters from './FightAddCharacters';
import FightTable from './FightTable';

import { appStore } from '../store';

let nextCharacterByKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'n') {
    appStore.fight.nextCharacter();
  }
};

autorun(() => {
  if (appStore.activeTab === 'fightPane' && appStore.fight.phase === 'turn') {
    window.addEventListener('keypress', nextCharacterByKeyboard);
  }
  if (appStore.activeTab !== 'fightPane' || appStore.fight.phase === 'new') {
    window.removeEventListener('keypress', nextCharacterByKeyboard);
  }
});

@observer
class Fight extends React.Component {
  @observable
  showFightAddCharacters = false;

  newFight() {
    if (confirm('Are you sure you want to remove ALL characters from the current fight and start a new one?')) {
      appStore.fight.newFight();
    }
  }

  render() {
    return (
      <>
        <Button disabled={!appStore.fight.isFightAble} onClick={appStore.fight.newTurn}>
          New Turn
        </Button>
        <Button disabled={!appStore.fight.isFightStartable} onClick={appStore.fight.startTurn}>
          Start turn
        </Button>
        <Button disabled={appStore.fight.phase === 'new'} onClick={appStore.fight.nextCharacter}>
          Next Character
        </Button>
        <Button onClick={this.newFight}>New Fight</Button>

        <FightTable />

        <AppModal
          modalTitle="Add characters to fight"
          open={this.showFightAddCharacters}
          onClose={() => (this.showFightAddCharacters = false)}
        >
          <FightAddCharacters close={() => (this.showFightAddCharacters = false)} />
        </AppModal>

        <AddButton onAdd={() => (this.showFightAddCharacters = true)} />
      </>
    );
  }
}

export default Fight;
