import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Zoom from '@material-ui/core/Zoom';

import CharacterTableRow from './CharacterTableRow';
import CharacterAddForm from './CharacterAddForm';
import AppModal from './Modal';

import { appStore } from '../store';

@observer
class CharactersTable extends React.Component {
  @observable
  showAddUserForm = false;

  render() {
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Base Initiative</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appStore.characters.map((character, index: number) => (
              <CharacterTableRow key={`charakter-${index}`} index={index} character={character} />
            ))}
          </TableBody>
        </Table>
        <AppModal open={this.showAddUserForm} modalTitle="Add character" onClose={() => (this.showAddUserForm = false)}>
          <CharacterAddForm />
        </AppModal>
        <div className="add-character-button">
          <Zoom in unmountOnExit>
            <Button variant="fab" color="primary" onClick={_ => (this.showAddUserForm = !this.showAddUserForm)}>
              <AddIcon />
            </Button>
          </Zoom>
        </div>
      </>
    );
  }
}

export default CharactersTable;
