import * as React from 'react';
import { observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { appStore } from '../store';

import FightTableRow from './FightTableRow';

@observer
class Charakter extends React.Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Acted</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Base Initiative</TableCell>
            <TableCell>Modifiers</TableCell>
            <TableCell>D100</TableCell>
            <TableCell>Current Initiative</TableCell>
            <TableCell>Advantage towards</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appStore.fight.fightingCharactersByPhase.map((character, index: number) => (
            <FightTableRow key={`charakter-${index}`} index={index} character={character} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Charakter;
