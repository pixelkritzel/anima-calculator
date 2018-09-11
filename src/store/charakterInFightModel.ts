import { getParent, types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterModel } from '#src/store/characterModel';
import rollD100 from '#src/utils/d100';

import { ModifierModel, IModifierData, createModifier } from '#src/store/modifierModel';

export const characterInFightModel = types
  .model('characterInFight', {
    baseCharacter: types.reference(characterModel),
    inititiaveModifiers: types.optional(types.array(ModifierModel), []),
    lifepointsModifiers: types.optional(types.array(ModifierModel), []),
    accumulatedPowerPoints: types.optional(types.number, 0),
    hasAccumulated: false,
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
    accumulatePowerPoints(half?: boolean) {
      self.accumulatedPowerPoints += half
        ? Math.round(self.baseCharacter.powerPointsAccumulation / 2)
        : self.baseCharacter.powerPointsAccumulation;
      self.hasAccumulated = true;
    },
    addIniModifier(modifierData: IModifierData) {
      self.inititiaveModifiers.push(createModifier(modifierData));
    },
    removeIniModifier(id: string) {
      const index = self.inititiaveModifiers.findIndex(mod => mod.id === id);
      self.inititiaveModifiers.splice(index, 1);
    },
    addLifepointsModifier(modifierData: IModifierData) {
      self.lifepointsModifiers.push(createModifier(modifierData));
    },
    removeLifepointsModifier(id: string) {
      const index = self.lifepointsModifiers.findIndex(mod => mod.id === id);
      self.lifepointsModifiers.splice(index, 1);
    },
    resetAccumulated() {
      self.accumulatedPowerPoints = 0;
    },
    rolld100() {
      self.d100 = rollD100();
    },
    toogleActed() {
      self.acted = !self.acted;
    }
  }));

export type ICharakterInFightModel = typeof characterInFightModel.Type;
