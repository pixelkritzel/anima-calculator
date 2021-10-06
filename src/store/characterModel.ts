import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { v4 as uuid4 } from 'uuid';

export const characterModel = types
  .model('character', {
    id: types.optional(types.identifier, uuid4),
    agility: 0,
    baseInitiative: 0,
    group: types.enumeration(['player', 'nsc']),
    lifepoints: 0,
    name: types.string,
    powerPoints: 0,
    powerPointsAccumulation: 0,
  })
  .actions((self) => ({
    setBaseInitiative(ini: number) {
      self.baseInitiative = ini;
    },
    setAgility(agility: number) {
      self.agility = agility;
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
export type SICharacter = SnapshotIn<typeof characterModel>;
