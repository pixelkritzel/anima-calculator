import { destroy, types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterInFightModel, ICharakterInFightModel } from '#src/store/charakterInFightModel';
import { IModifierModel } from '#src/store/modifierModel';

function updateModifiersForNextTurn(modifiers: IModifierModel[]) {
  modifiers.forEach(modifier => {
    modifier.setValue(modifier.value + modifier.value);
    if (modifier.changePerTurn && modifier.value >= 0) {
      destroy(modifier);
    }
  });
}

export const fightModel = types
  .model('fight', {
    fightingCharacters: types.array(characterInFightModel),
    activeCharacter: 0,
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
    get fightingCharactersByInitiative() {
      return self.fightingCharacters.sort((a, b) => b.currentInitiative! - a.currentInitiative!);
    },
  }))
  .actions(self => ({
    newFight() {
      self.fightingCharacters.clear();
    },
    newTurn() {
      self.fightingCharacters.forEach(character => {
        character.acted = false;
        character.hasAccumulated = false;
        character.rolld100();
        updateModifiersForNextTurn(character.inititiaveModifiers);
        updateModifiersForNextTurn(character.lifepointsModifiers);
      });
      self.activeCharacter = 0;
    },
    nextCharacter() {
      if (self.activeCharacter < self.fightingCharacters.length) {
        self.fightingCharactersByInitiative[self.activeCharacter].toogleActed();
        self.activeCharacter++;
      }
    },
    removeCharacterFromFight(characterToBeRemoved: ICharakterInFightModel) {
      const indexOfCharacter = self.fightingCharacters.indexOf(characterToBeRemoved);
      self.fightingCharacters.splice(indexOfCharacter, 1);
    },
  }));
