import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import AddButton from './AddButton';
import CharacterAddForm from './CharacterAddForm';
import CharactersTable from './CharactersTable';
import AppModal from './AppModal';

@observer
class CharactersView extends React.Component {
  @observable
  showAddUserForm = false;

  render() {
    return (
      <>
        <CharactersTable />
        <AddButton onAdd={() => (this.showAddUserForm = !this.showAddUserForm)} />
        <AppModal open={this.showAddUserForm} modalTitle="Add character" onClose={() => (this.showAddUserForm = false)}>
          <CharacterAddForm />
        </AppModal>
      </>
    );
  }
}

export default CharactersView;
