import { types } from 'mobx-state-tree';
import generateUUID from '#src/utils/generateUUID';

export type IModifierData = {
  id?: string;
  changePerTurn?: number;
  reason?: string;
  value: number;
};

export const ModifierModel = types
  .model('modifier', {
    id: types.optional(types.identifier, generateUUID),
    changePerTurn: types.optional(types.number, 0),
    reason: types.optional(types.string, ''),
    value: types.number,
  })
  .actions(self => ({
    setValue(value: number) {
      self.value = value;
    },
  }));

export type IModifierModel = typeof ModifierModel.Type;
