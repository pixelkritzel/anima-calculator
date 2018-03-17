import * as React from 'react';

import { observer } from 'mobx-react';

import { Button, ButtonGroup } from 'react-bootstrap';

import { ICharakterModel } from '../store/characterModel';

type ICharactersTableRowProps = {
  character: ICharakterModel;
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
        <td>{character.name}</td>
        <td>{character.group} </td>
        <td>{character.baseInitiative}</td>
        <th>
          <ButtonGroup>
            <Button bsStyle="primary">Edit</Button>
            <Button bsStyle="danger">Delete</Button>
          </ButtonGroup>
        </th>
      </tr>
    );
  }
}

export default CharactersTableRow;
