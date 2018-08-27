import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';

import AddButton from './AddButton';
import AppModal from './AppModal';
import FightAddCharacters from './FightAddCharacters';
import FightTable from './FightTable';

import { IStore } from '#src/store';

@inject('store')
@observer
class Fight extends React.Component<{ store?: IStore }, {}> {
  @observable
  showFightAddCharacters = false;

  componentDidMount() {
    window.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.onKeyPress);
  }

  onKeyPress = (event: KeyboardEvent) => {
    const store = this.props.store!;
    if (event.key === 'n') {
      store.fight.nextCharacter();
    }
  };

  newFight = () => {
    if (confirm('Are you sure you want to remove ALL characters from the current fight and start a new one?')) {
      this.props.store!.fight.newFight();
    }
  };

  render() {
    const store = this.props.store!;
    return (
      <>
        <Button disabled={!store.fight.isFightAble} onClick={store.fight.newTurn}>
          New Turn
        </Button>
        <Button
          disabled={store.fight.activeCharacter === store.fight.fightingCharacters.length - 1}
          onClick={store.fight.nextCharacter}
        >
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
