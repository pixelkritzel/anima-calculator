import { types } from 'mobx-state-tree';

export const characterModel = types
  .model('character', {
    id: types.identifier(types.string),
    name: types.string,
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
  })
  .actions(self => ({
    setBaseInitiative(ini: number) {
      self.baseInitiative = ini;
    },

    setName(name: string) {
      self.name = name;
    }
  }));

export type ICharakterModel = typeof characterModel.Type;
