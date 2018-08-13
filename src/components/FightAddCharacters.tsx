import * as React from 'react';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { appStore } from '../store';

type IFightAddCharactersProps = {
  close: () => void;
};

@observer
export default class FightAddCharacters extends React.Component<IFightAddCharactersProps, {}> {
  addCharacterToFight = (characterId: string) => {
    appStore.addCharacterToFight(characterId);
    if (appStore.charactersNotInFight.length === 0) {
      this.props.close();
    }
  };

  render() {
    return (
      <div className="fight-add-character">
        <Table>
          <TableHead>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Ini</TableCell>
            <TableCell />
          </TableHead>
          <TableBody>
            {appStore.charactersNotInFight.map(({ name, group, baseInitiative, id }, index) => (
              <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{group}</TableCell>
                <TableCell>{baseInitiative}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.addCharacterToFight(id)}>
                    Add character to fight
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
