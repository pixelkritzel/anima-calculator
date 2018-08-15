import * as React from 'react';
import { observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CharacterTableRow from './CharacterTableRow';

import { appStore } from '#src/store';

@observer
export default class CharactersTable extends React.Component {
  render() {
    return (
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
    );
  }
}
