import * as React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import HighlightOnUpdate from '#src/components/HighlightOnUpdate';
import Modifiers from '#src/components/Modifiers';

import { IStore } from '#src/store';
import { ICharakterInFightModel } from '#src/store/charakterInFightModel';

type ICharactersTableRowProps = {
  fadeIn: boolean;
  character: ICharakterInFightModel;
  index: number;
  store?: IStore;
};

export const FADE_IN_DURATION = 600;

@inject('store')
@observer
class CharactersTableRow extends React.Component<ICharactersTableRowProps, {}> {
  state = {
    hide: false
  };

  timeoutId: NodeJS.Timer;

  componentWillReceiveProps(nextProps: ICharactersTableRowProps) {
    if (nextProps.fadeIn) {
      clearTimeout(this.timeoutId);
      this.setState({ hide: true });
      this.timeoutId = setTimeout(() => this.setState({ hide: false }), (nextProps.index + 1) * FADE_IN_DURATION);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { fadeIn, character, index, store } = this.props;
    return this.state.hide ? (
      <TableRow />
    ) : (
      <TableRow className={cx({ 'fade-in-table-row': fadeIn })} selected={store!.fight.activeCharacter === index}>
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
        <HighlightOnUpdate
          tracking={character.currentInitiative}
          resetAfter={1500}
          render={isUpdate => (
            <TableCell className={cx({ 'value-changed': isUpdate })}>{character.currentInitiative}</TableCell>
          )}
        />
        <HighlightOnUpdate
          tracking={character.currentLifepoints}
          resetAfter={1500}
          render={isUpdate => (
            <TableCell className={cx({ 'value-changed': isUpdate })}>
              <strong>{character.currentLifepoints}</strong> <br /> / ({character.criticalHit})
            </TableCell>
          )}
        />
        <HighlightOnUpdate
          tracking={character.advantageAgainst.map(char => char.baseCharacter.id).join('')}
          resetAfter={1500}
          render={isUpdate => (
            <TableCell className={cx({ 'value-changed': isUpdate })}>
              <ul>
                {character.advantageAgainst.map(opponent => (
                  <li key={`${character.baseCharacter.id}-${opponent.baseCharacter.id}`}>
                    {opponent.baseCharacter.name}
                  </li>
                ))}
              </ul>
            </TableCell>
          )}
        />
        <TableCell>
          <Button onClick={character.rolld100}>Roll D100</Button>
          <br />
          <Button color="secondary" onClick={() => store!.fight.removeCharacterFromFight(character)}>
            Remove Character from Fight
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default CharactersTableRow;
