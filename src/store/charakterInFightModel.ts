import { types } from 'mobx-state-tree';

import d100 from '../utils/d100';

import { characterModel } from './characterModel';

export const characterInFightModel = types
  .model('character', {
    baseCharacter: types.reference(characterModel),
    modifiers: types.optional(
      types.array(
        types.model({
          value: types.number,
          reason: types.optional(types.string, () => '')
        })
      ),
      () => []
    ),
    d100: 0
  })
  .actions(self => ({
    rolld100() {
      self.d100 = d100();
    }
  }))
  .views(self => ({
    get currentInitiative() {
      const sumOfModifiers = self.modifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.baseInitiative + sumOfModifiers + self.d100;
    }
  }));

export type ICharakterInFightModel = typeof characterInFightModel.Type;
