import { getParent, types } from 'mobx-state-tree';

import d100 from '../utils/d100';
import generateUUID from '../utils/generateUUID';

import { characterModel } from './characterModel';

type IModifierData = {
  id?: string;
  value: number;
  reason?: string;
};

const ModifierModel = types.model({
  id: types.string,
  value: types.number,
  reason: types.optional(types.string, () => '')
});

export const characterInFightModel = types
  .model('character', {
    baseCharacter: types.reference(characterModel),
    modifiers: types.optional(types.array(ModifierModel), () => []),
    d100: 0
  })
  .actions(self => ({
    addModifier(modifierData: IModifierData) {
      modifierData.id = generateUUID();
      self.modifiers.push(ModifierModel.create(modifierData));
    },
    removeModifier(id: string) {
      const index = self.modifiers.findIndex(mod => mod.id === id);
      self.modifiers.splice(index - 1, 1);
    },
    rolld100() {
      self.d100 = d100();
    }
  }))
  .views(self => ({
    get currentInitiative() {
      const sumOfModifiers = self.modifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.baseInitiative + sumOfModifiers + self.d100;
    },
    get advantageAgainst() {
      const allOpponents: ICharakterInFightModel[] = getParent(self);
      return allOpponents.filter(opponent => opponent.currentInitiative + 150 < this.currentInitiative);
    }
  }));

export type ICharakterInFightModel = typeof characterInFightModel.Type;
