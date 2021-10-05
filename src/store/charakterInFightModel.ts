import { types, Instance } from 'mobx-state-tree';

import { characterModel } from 'store/characterModel';
import rollD100 from 'utils/d100';

import { ModifierModel, IModifierModel, IModifierData } from 'store/modifierModel';
import { v4 as uuid4 } from 'uuid';

export const characterInFightModel = types
  .model('characterInFight', {
    id: types.optional(types.identifier, uuid4),
    baseCharacter: types.reference(characterModel),
    inititiaveModifiers: types.array(types.reference(ModifierModel)),
    lifepointsModifiers: types.array(types.reference(ModifierModel)),
    accumulatedPowerPoints: 0,
    hasAccumulated: false,
    d100: 0,
    acted: false,
  })
  .views((self) => ({
    get currentInitiative() {
      const sumOfModifiers = self.inititiaveModifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.baseInitiative + sumOfModifiers + self.d100;
    },
    get currentLifepoints() {
      const sumOfModifiers = self.lifepointsModifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.lifepoints + sumOfModifiers;
    },
  }))
  .views((self) => ({
    get criticalHit() {
      return Math.round(self.currentLifepoints / 2);
    },
  }))
  .actions((self) => ({
    accumulatePowerPoints(half?: boolean) {
      self.accumulatedPowerPoints += half
        ? Math.round(self.baseCharacter.powerPointsAccumulation / 2)
        : self.baseCharacter.powerPointsAccumulation;
      self.hasAccumulated = true;
    },
    addIniModifier(modifier: IModifierModel) {
      self.inititiaveModifiers.push(modifier);
    },
    removeIniModifier(id: string) {
      const index = self.inititiaveModifiers.findIndex((mod) => mod.id === id);
      self.inititiaveModifiers.splice(index, 1);
    },
    addLifepointsModifier(modifierData: IModifierData) {
      self.lifepointsModifiers.push(ModifierModel.create(modifierData));
    },
    removeLifepointsModifier(id: string) {
      const index = self.lifepointsModifiers.findIndex((mod) => mod.id === id);
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
    },
  }));

export type ICharakterInFightModel = Instance<typeof characterInFightModel>;
