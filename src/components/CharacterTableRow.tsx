import * as React from 'react';

import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditableTextField from './EditableTextfield';

import { IStore } from '#src/store';
import { ICharacterModel } from '#src/store/characterModel';

type ICharactersTableRowProps = {
  character: ICharacterModel;
  index: number;
  key: string;
  store?: IStore;
};

@inject('store')
@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  deleteCharacter = (character: ICharacterModel) => {
    if (confirm(`Do you really want to delete ${character.name}?`)) {
      this.props.store!.deleteCharacter(character);
    }
  };

  render() {
    const { character, index } = this.props;
    return (
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>
          <EditableTextField value={character.name} onSave={character.setName} />
        </TableCell>
        <TableCell>{character.group} </TableCell>
        <TableCell>
          <EditableTextField
            value={character.lifepoints.toString()}
            type="number"
            onSave={value => character.setLifePoints(parseInt(value, 10))}
          />
        </TableCell>
        <TableCell>
          <EditableTextField
            value={character.baseInitiative.toString()}
            type="number"
            onSave={value => character.setBaseInitiative(parseInt(value, 10))}
          />
        </TableCell>
        <TableCell>
          <EditableTextField
            value={character.powerPoints.toString()}
            type="number"
            onSave={value => character.setPowerPoints(parseInt(value, 10))}
          />
        </TableCell>
        <TableCell>
          <EditableTextField
            value={character.powerPointsAccumulation.toString()}
            type="number"
            onSave={value => character.setPowerPointsAccumulation(parseInt(value, 10))}
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
