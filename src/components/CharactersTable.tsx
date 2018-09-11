import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CharacterTableRow from '#src/components/CharacterTableRow';

import { IStore } from '#src/store';

@inject('store')
@observer
export default class CharactersTable extends React.Component<{ store?: IStore }, {}> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Lifepoints</TableCell>
            <TableCell>Base Initiative</TableCell>
            <TableCell>Power points</TableCell>
            <TableCell>Accumulation</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.store!.characters.map((character, index: number) => (
            <CharacterTableRow key={`charakter-${character.id}`} index={index} character={character} />
          ))}
        </TableBody>
      </Table>
    );
  }
}
