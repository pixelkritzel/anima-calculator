import * as React from 'react';

import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Modifiers from '#src/components/Modifiers';

import { IStore } from '#src/store';
import { ICharakterInFightModel } from '#src/store/charakterInFightModel';

type ICharactersTableRowProps = {
  character: ICharakterInFightModel;
  index: number;
  key: string;
  store?: IStore;
};

@inject('store')
@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  render() {
    const { character, index, store } = this.props;
    return (
      <>
        <TableRow selected={store!.fight.activeCharacter === index}>
          <TableCell>
            <Checkbox checked={character.acted} onClick={character.toogleActed} />
          </TableCell>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{character.baseCharacter.name}</TableCell>
          <TableCell>{character.baseCharacter.group} </TableCell>
          <TableCell>{character.baseCharacter.lifepoints}</TableCell>
          <TableCell>
            <Modifiers
              modifiers={character.lifepointsModifiers}
              addModifier={character.addLifepointsModifier}
              removeModifier={character.removeLifepointsModifier}
            />
          </TableCell>
          <TableCell>{character.baseCharacter.baseInitiative}</TableCell>
          <TableCell>
            <Modifiers
              modifiers={character.inititiaveModifiers}
              addModifier={character.addIniModifier}
              removeModifier={character.removeIniModifier}
            />
          </TableCell>
          <TableCell>{character.d100}</TableCell>
          <TableCell>{character.currentInitiative}</TableCell>
          <TableCell>
            <strong>{character.currentLifepoints}</strong> <br /> / ({character.criticalHit})
          </TableCell>
          <TableCell>
            <ul>
              {character.advantageAgainst.map(opponent => (
                <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>
                  {opponent.baseCharacter.name}
                </li>
              ))}
            </ul>
          </TableCell>
          <TableCell>
            <Button onClick={character.rolld100}>Roll D100</Button>
            <br />
            <Button color="secondary" onClick={() => store!.fight.removeCharacterFromFight(character)}>
              Remove Character from Fight
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  }
}

export default CharactersTableRow;
