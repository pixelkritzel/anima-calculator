import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import generateUUID from '#src/utils/generateUUID';

export const characterModel = types
  .model('character', {
    id: types.optional(types.identifier, generateUUID),
    baseInitiative: types.number,
    group: types.enumeration(['player', 'nsc']),
    lifepoints: types.number,
    name: types.string,
    powerPoints: types.optional(types.number, 0),
    powerPointsAccumulation: types.optional(types.number, 0),
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
    },
  }));

export type ICharacterModel = Instance<typeof characterModel>;
export type ICharacterModelData = SnapshotIn<typeof characterModel>;
