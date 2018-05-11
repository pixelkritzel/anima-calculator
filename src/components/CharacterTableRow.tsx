import * as React from 'react';

import { observer } from 'mobx-react';

import { Button, ButtonGroup } from 'reactstrap';
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
  render() {
    const { character, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>
          <EditableTextField text={character.name} onSave={character.setName} />
        </td>
        <td>{character.group} </td>
        <td>
          <EditableTextField
            text={character.baseInitiative.toString()}
            type="number"
            onSave={value => character.setBaseInitiative(parseInt(value, 10))}
          />
        </td>
        <th>
          <ButtonGroup>
            <Button color="danger" onClick={() => appStore.deleteCharacter(character)}>
              Delete
            </Button>
          </ButtonGroup>
        </th>
      </tr>
    );
  }
}

export default CharactersTableRow;
