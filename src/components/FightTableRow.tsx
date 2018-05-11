import * as React from 'react';

import { observer } from 'mobx-react';

import { Button, ButtonGroup } from 'reactstrap';

import { ICharakterInFightModel } from '../store/charakterInFightModel';

type ICharactersTableRowProps = {
  character: ICharakterInFightModel;
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
        <td>{character.baseCharacter.name}</td>
        <td>{character.baseCharacter.group} </td>
        <td>{character.baseCharacter.baseInitiative}</td>
        <td>
          <ul>
            {character.modifiers.map((mod, modIndex) => (
              <li key={`charakter-${index}-modifier-${modIndex}`}>
                {mod.value}
                {mod.reason && ' - '}
                {mod.reason}
              </li>
            ))}
          </ul>
        </td>
        <td>{character.d100}</td>
        <td>{character.currentInitiative}</td>
        <th>nobody</th>
        <th>
          <ButtonGroup>
            <Button color="primary">Edit</Button>
            <Button onClick={character.rolld100}>Roll D100</Button>
            <Button color="danger">Delete</Button>
          </ButtonGroup>
        </th>
      </tr>
    );
  }
}

export default CharactersTableRow;
