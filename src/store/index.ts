import { types } from 'mobx-state-tree';

import { characterModel } from './characterModel';
import { characterInFightModel } from './charakterInFightModel';

const initialData = {
  characters: [
    {
      name: 'Strauchdieb',
      group: 'NSC',
      baseInitiative: 10
    }
  ]
};

const appStoreConstructor = types
  .model('appStore', {
    characters: types.array(characterModel),
    fight: types.optional(
      types.model({
        fightingCharacters: types.array(characterInFightModel)
      }),
      () => ({ fightingCharacters: [] })
    )
  })
  .actions(self => ({
    addCharacterToFight(toBeAddedCharacterName: string) {
      const baseCharacter = self.characters.find(char => char.name === toBeAddedCharacterName);
      if (baseCharacter) {
        const characterInFight = characterInFightModel.create({ baseCharacter });
        self.fight.fightingCharacters.push(characterInFight);
      }
    }
  }))
  .views(self => ({
    get charactersNotInFight() {
      return self.characters.filter(
        char => !self.fight.fightingCharacters.find(fightingChar => fightingChar.baseCharacter.name === char.name)
      );
    }
  }));

export const appStore = appStoreConstructor.create(initialData);
