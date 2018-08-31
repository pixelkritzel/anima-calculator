import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FightTableRow, { FADE_IN_DURATION } from '#src/components/FightTableRow';
import HighlightOnUpdate from '#src/components/HighlightOnUpdate';

import { IStore } from '#src/store';

type IFighTableProps = { store?: IStore };

@inject('store')
@observer
class FightTable extends React.Component<IFighTableProps, {}> {
  render() {
    const { fightingCharactersByInitiative } = this.props.store!.fight;
    const charactersOrderHash = fightingCharactersByInitiative.map(character => character.baseCharacter.id).join('');
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
          {fightingCharactersByInitiative.map((character, index: number) => (
            <HighlightOnUpdate
              key={`character-${character.baseCharacter.id}`}
              resetAfter={(index + 1) * FADE_IN_DURATION * 2}
              tracking={charactersOrderHash}
              render={isUpdated => <FightTableRow index={index} character={character} fadeIn={isUpdated} />}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default FightTable;
