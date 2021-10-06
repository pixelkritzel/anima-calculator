import { destroy, types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterInFightModel, ICharakterInFightModel } from 'store/charakterInFightModel';
import { IModifierModel } from 'store/modifierModel';

function updateModifiersForNextTurn(modifiers: IModifierModel[]) {
  modifiers.forEach((modifier) => {
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
  .views((self) => ({
    get isFightAble() {
      return self.fightingCharacters.length > 1;
    },
    get isFightStartable() {
      return (
        self.fightingCharacters.length > 0 &&
        self.fightingCharacters.every((character) => !isNull(character.currentInitiative))
      );
    },
    get fightingCharactersByInitiative() {
      return self.fightingCharacters.slice().sort((a, b) => {
        const currentInitiativeDifference = b.currentInitiative! - a.currentInitiative!;
        const baseInitiativeDifference =
          b.baseCharacter.baseInitiative! - a.baseCharacter.baseInitiative;
        const agilityDifference = b.baseCharacter.agility - a.baseCharacter.agility;
        if (
          currentInitiativeDifference === 0 &&
          baseInitiativeDifference === 0 &&
          agilityDifference === 0
        ) {
          a.setIsActingSimultaneously(true);
          b.setIsActingSimultaneously(true);
        }
        if (currentInitiativeDifference !== 0) {
          return currentInitiativeDifference;
        } else if (baseInitiativeDifference !== 0) {
          return baseInitiativeDifference;
        } else {
          return agilityDifference;
        }
      });
    },
    getAdvantageAgainst(actingCharacterInitiative: ICharakterInFightModel['currentInitiative']) {
      return self.fightingCharacters.filter(
        (opponent) =>
          !isNull(opponent.currentInitiative) &&
          !isNull(actingCharacterInitiative) &&
          opponent.currentInitiative + 150 < actingCharacterInitiative
      );
    },
  }))
  .actions((self) => ({
    newFight() {
      self.fightingCharacters.clear();
    },
    newTurn() {
      self.fightingCharacters.forEach((character) => {
        character.acted = false;
        character.hasAccumulated = false;
        character.rolld100();
        character.setIsActingSimultaneously(false);
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
