import { destroy, onPatch, types } from 'mobx-state-tree';
import generateUUID from '../utils/generateUUID';

import { characterModel, ICharacterModel, characterInitialDataType } from './characterModel';
import { characterInFightModel } from './charakterInFightModel';

const jsonCharacters = localStorage.getItem('animaCharacters');

let savedCharacters;

if (jsonCharacters) {
  try {
    savedCharacters = JSON.parse(jsonCharacters);
  } catch (e) {} // tslint:disable-line
}

const initialData = {
  characters: savedCharacters || []
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
    addCharacter(characterData: characterInitialDataType) {
      characterData.id = generateUUID();
      self.characters.push(characterModel.create(characterData));
    },
    addCharacterToFight(toBeAddedCharacterName: string) {
      const baseCharacter = self.characters.find(char => char.name === toBeAddedCharacterName);
      if (baseCharacter) {
        const characterInFight = characterInFightModel.create({ baseCharacter });
        self.fight.fightingCharacters.push(characterInFight);
      }
    },
    deleteCharacter(character: ICharacterModel) {
      const characterInFight = self.fight.fightingCharacters.find(fightChar => fightChar.baseCharacter === character);
      if (characterInFight) {
        destroy(characterInFight);
      }
      destroy(character);
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

onPatch(appStore, () => {
  localStorage.setItem('animaCharacters', JSON.stringify(appStore.characters));
});
