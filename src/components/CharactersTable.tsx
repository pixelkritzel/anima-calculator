import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CharacterTableRow from './CharacterTableRow';
import CharacterAddForm from './CharacterAddForm';

import { appStore } from '../store';

@observer
class CharactersTable extends React.Component {
  @observable
  showAddUserForm = false;
  render() {
    return (
      <div>
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

        <CharacterAddForm />
      </div>
    );
  }
}

export default CharactersTable;
