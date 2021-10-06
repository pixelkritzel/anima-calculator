import { types } from 'mobx-state-tree';
import { v4 as uuid4 } from 'uuid';

export type IModifierData = {
  id?: string;
  changePerTurn?: number;
  reason?: string;
  value: number;
};

export const ModifierModel = types
  .model('modifier', {
    id: types.optional(types.identifier, uuid4),
    changePerTurn: 0,
    reason: '',
    value: 0,
  })
  .actions((self) => ({
    setValue(value: number) {
      self.value = value;
    },
  }));

export type IModifierModel = typeof ModifierModel.Type;
