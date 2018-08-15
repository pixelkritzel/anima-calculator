import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import AddButton from '#src/components/AddButton';
import CharacterAddForm from '#src/components/CharacterAddForm';
import CharactersTable from '#src/components/CharactersTable';
import AppModal from '#src/components/AppModal';

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
