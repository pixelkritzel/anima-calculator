import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FightTableRow from '#src/components/FightTableRow';

import { IStore } from '#src/store';

@inject('store')
@observer
class Charakter extends React.Component<{ store?: IStore }, {}> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Acted</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Lifepoints</TableCell>
            <TableCell>Lifepoints Modifiers</TableCell>
            <TableCell>Base Ini</TableCell>
            <TableCell>Ini Modifiers</TableCell>
            <TableCell>D100</TableCell>
            <TableCell>Current Initiative</TableCell>
            <TableCell>
              Current Lifepoints <br />/ Critical hit
            </TableCell>
            <TableCell>Advantage towards</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.store!.fight.fightingCharactersByInitiative.map((character, index: number) => (
            <FightTableRow key={`charakter-${index}`} index={index} character={character} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Charakter;
