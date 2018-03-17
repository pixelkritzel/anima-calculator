import { types } from 'mobx-state-tree';

import { characterModel } from './characterModel';
import { characterInFightModel } from './charakterInFightModel';

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
    // tslint:disable-next-line
    var r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

const initialData = {
  characters: [
    {
      id: generateUUID(),
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
    ),
    idCounter: 0
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
