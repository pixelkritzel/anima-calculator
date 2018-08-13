import * as React from 'react';

import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditableTextField from './EditableTextfield';

import { appStore } from '../store';
import { ICharacterModel } from '../store/characterModel';

type ICharactersTableRowProps = {
  character: ICharacterModel;
  index: number;
  key: string;
};

@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  deleteCharacter = (character: ICharacterModel) => {
    if (confirm(`Do you really want to delete ${character.name}?`)) {
      appStore.deleteCharacter(character);
    }
  };

  render() {
    const { character, index } = this.props;
    return (
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>
          <EditableTextField text={character.name} onSave={character.setName} />
        </TableCell>
        <TableCell>{character.group} </TableCell>
        <TableCell>
          <EditableTextField
            text={character.baseInitiative.toString()}
            type="number"
            onSave={value => character.setBaseInitiative(parseInt(value, 10))}
          />
        </TableCell>
        <TableCell>
          <Button onClick={() => this.deleteCharacter(character)}>Delete</Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default CharactersTableRow;
