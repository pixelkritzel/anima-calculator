import { types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterInFightModel, ICharakterInFightModel } from './charakterInFightModel';

export const fightModel = types
  .model('fight', {
    fightingCharacters: types.optional(types.array(characterInFightModel), []),
    phase: types.enumeration(['new', 'turn']),
    activeCharacter: 0
  })
  .views(self => ({
    get isFightAble() {
      return self.fightingCharacters.length > 1;
    },
    get isFightStartable() {
      return (
        self.fightingCharacters.length > 0 &&
        self.fightingCharacters.every(character => !isNull(character.currentInitiative))
      );
    },
    get fightingCharactersByPhase() {
      if (self.phase === 'new') {
        return self.fightingCharacters.sort((a, b) => {
          if (a.baseCharacter.group > b.baseCharacter.group) {
            return -1;
          }
          if (a.baseCharacter.group < b.baseCharacter.group) {
            return 1;
          }
          return 0;
        });
      } else {
        return self.fightingCharacters.sort((a, b) => b.currentInitiative! - a.currentInitiative!);
      }
    }
  }))
  .actions(self => ({
    newFight() {
      self.fightingCharacters.clear();
    },
    newTurn() {
      self.phase = 'new';
      self.fightingCharacters.forEach(character => {
        character.acted = false;
        if (character.baseCharacter.group === 'nsc') {
          character.rolld100();
        } else {
          character.manualCurrentInitiative = null;
        }
      });
    },
    nextCharacter() {
      if (self.activeCharacter < self.fightingCharacters.length) {
        self.fightingCharactersByPhase[self.activeCharacter].toogleActed();
        self.activeCharacter++;
      }
    },
    removeCharacterFromFight(characterToBeRemoved: ICharakterInFightModel) {
      const indexOfCharacter = self.fightingCharacters.indexOf(characterToBeRemoved);
      self.fightingCharacters.splice(indexOfCharacter, 1);
    },
    startTurn() {
      self.phase = 'turn';
      self.activeCharacter = 0;
    }
  }));
