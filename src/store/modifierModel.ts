import { types } from 'mobx-state-tree';
import generateUUID from '#src/utils/generateUUID';

export type IModifierData = {
  id?: string;
  changePerTurn?: number;
  reason?: string;
  value: number;
};

export const ModifierModel = types.model({
  id: types.string,
  changePerTurn: types.optional(types.number, 0),
  reason: types.optional(types.string, ''),
  value: types.number
});

export function createModifier(modifierData: IModifierData) {
  modifierData.id = generateUUID();
  return ModifierModel.create(modifierData);
}

export type IModifierModel = typeof ModifierModel.Type;
