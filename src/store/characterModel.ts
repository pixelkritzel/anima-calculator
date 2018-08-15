import { types } from 'mobx-state-tree';

export type characterInitialDataType = {
  id?: string;
  name: string;
  group: string;
  baseInitiative: number;
};

export const characterModel = types
  .model('character', {
    id: types.identifier(types.string),
    name: types.string,
    group: types.enumeration(['player', 'nsc']),
    baseInitiative: types.number,
    modifiers: types.optional(
      types.array(
        types.model({
          value: types.number,
          reason: types.optional(types.string, () => '')
        })
      ),
      () => []
    )
  })
  .actions(self => ({
    setBaseInitiative(ini: number) {
      self.baseInitiative = ini;
    },

    setName(name: string) {
      self.name = name;
    }
  }));

export type ICharacterModel = typeof characterModel.Type;
