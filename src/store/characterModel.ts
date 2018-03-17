import { types } from 'mobx-state-tree';

export const characterModel = types.model('character', {
  name: types.identifier(types.string),
  group: types.string,
  baseInitiative: types.number,
  modifiers: types.optional(
    types.array(
      types.model({
        value: types.number,
        reason: types.optional(types.string, () => '')
      })
    ),
    () => []
  ),
  d100: types.optional(types.number, () => 0)
});

export type ICharakterModel = typeof characterModel.Type;
