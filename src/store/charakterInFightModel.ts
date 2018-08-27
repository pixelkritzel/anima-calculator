import { getParent, types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterModel } from '#src/store/characterModel';
import rollD100 from '#src/utils/d100';
import generateUUID from '#src/utils/generateUUID';

export type IModifierData = {
  id?: string;
  value: number;
  reason?: string;
};

const ModifierModel = types.model({
  id: types.string,
  value: types.number,
  reason: types.optional(types.string, () => '')
});

export type IModifierModel = typeof ModifierModel.Type;

export const characterInFightModel = types
  .model('character', {
    baseCharacter: types.reference(characterModel),
    inititiaveModifiers: types.optional(types.array(ModifierModel), () => []),
    lifepointsModifiers: types.optional(types.array(ModifierModel), () => []),
    d100: 0,
    acted: false
  })
  .views(self => ({
    get currentInitiative() {
      const sumOfModifiers = self.inititiaveModifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.baseInitiative + sumOfModifiers + self.d100;
    },
    get currentLifepoints() {
      const sumOfModifiers = self.lifepointsModifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.lifepoints + sumOfModifiers;
    }
  }))
  .views(self => ({
    get advantageAgainst() {
      const allOpponents: ICharakterInFightModel[] = getParent(self);
      return allOpponents.filter(
        opponent =>
          !isNull(opponent.currentInitiative) &&
          !isNull(self.currentInitiative) &&
          opponent.currentInitiative + 150 < self.currentInitiative
      );
    },
    get criticalHit() {
      return Math.round(self.currentLifepoints / 2);
    }
  }))
  .actions(self => ({
    addIniModifier(modifierData: IModifierData) {
      modifierData.id = generateUUID();
      self.inititiaveModifiers.push(ModifierModel.create(modifierData));
    },
    removeIniModifier(id: string) {
      const index = self.inititiaveModifiers.findIndex(mod => mod.id === id);
      self.inititiaveModifiers.splice(index, 1);
    },
    addLifepointsModifier(modifierData: IModifierData) {
      modifierData.id = generateUUID();
      self.lifepointsModifiers.push(ModifierModel.create(modifierData));
    },
    removeLifepointsModifier(id: string) {
      const index = self.lifepointsModifiers.findIndex(mod => mod.id === id);
      self.lifepointsModifiers.splice(index, 1);
    },
    rolld100() {
      self.d100 = rollD100();
    },
    toogleActed() {
      self.acted = !self.acted;
    }
  }));

export type ICharakterInFightModel = typeof characterInFightModel.Type;
