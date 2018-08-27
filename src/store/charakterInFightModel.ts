import { getParent, types } from 'mobx-state-tree';
import { isNull } from 'lodash';

import { characterModel } from '#src/store/characterModel';
import rollD100 from '#src/utils/d100';
import generateUUID from '#src/utils/generateUUID';

type IModifierData = {
  id?: string;
  value: number;
  reason?: string;
};

const ModifierModel = types.model({
  id: types.string,
  value: types.number,
  reason: types.optional(types.string, () => '')
});

export const characterInFightModel = types
  .model('character', {
    baseCharacter: types.reference(characterModel),
    inititiaveModifiers: types.optional(types.array(ModifierModel), () => []),
    d100: 0,
    acted: false
  })
  .views(self => ({
    get currentInitiative() {
      const sumOfModifiers = self.inititiaveModifiers.reduce((prev, mod) => prev + mod.value, 0);
      return self.baseCharacter.baseInitiative + sumOfModifiers + self.d100;
    },
    get advantageAgainst() {
      const allOpponents: ICharakterInFightModel[] = getParent(self);
      return allOpponents.filter(
        opponent =>
          !isNull(opponent.currentInitiative) &&
          !isNull(this.currentInitiative) &&
          opponent.currentInitiative + 150 < this.currentInitiative
      );
    }
  }))
  .actions(self => ({
    addModifier(modifierData: IModifierData) {
      modifierData.id = generateUUID();
      self.inititiaveModifiers.push(ModifierModel.create(modifierData));
    },
    removeModifier(id: string) {
      const index = self.inititiaveModifiers.findIndex(mod => mod.id === id);
      self.inititiaveModifiers.splice(index, 1);
    },
    rolld100() {
      self.d100 = rollD100();
    },
    toogleActed() {
      self.acted = !self.acted;
    }
  }));

export type ICharakterInFightModel = typeof characterInFightModel.Type;
