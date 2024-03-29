import * as React from 'react';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import AddButton from 'components/AddButton';
import AppModal from 'components/AppModal';
import CharacterAddForm from 'components/CharacterAddForm';
import CharactersTable from 'components/CharactersTable';

@observer
class CharactersView extends React.Component {
  @observable
  showAddUserForm = false;

  constructor(props: any) {
    super(props);
    makeObservable(this);
  }

  render() {
    return (
      <>
        <CharactersTable />
        <AddButton onAdd={() => (this.showAddUserForm = true)} />
        <AppModal
          open={this.showAddUserForm}
          modalTitle="Add character"
          onClose={() => (this.showAddUserForm = false)}
        >
          <CharacterAddForm />
        </AppModal>
      </>
    );
  }
}

export default CharactersView;
