import { types } from 'mobx-state-tree';

export type characterInitialDataType = {
  id?: string;
  baseInitiative: number;
  group: string;
  lifepoints: number;
  name: string;
  powerPoints?: number;
  powerPointsAccumulation?: number;
};

export const characterModel = types
  .model('character', {
    id: types.identifier(types.string),
    baseInitiative: types.number,
    group: types.enumeration(['player', 'nsc']),
    lifepoints: types.number,
    name: types.string,
    powerPoints: types.optional(types.number, 0),
    powerPointsAccumulation: types.optional(types.number, 0)
  })
  .actions(self => ({
    setBaseInitiative(ini: number) {
      self.baseInitiative = ini;
    },
    setLifePoints(lifepoints: number) {
      self.lifepoints = lifepoints;
    },
    setName(name: string) {
      self.name = name;
    },
    setPowerPoints(points: number) {
      self.powerPoints = points;
    },
    setPowerPointsAccumulation(accumulation: number) {
      self.powerPointsAccumulation = accumulation;
    }
  }));

export type ICharacterModel = typeof characterModel.Type;
