import { destroy, onPatch, types } from 'mobx-state-tree';
import generateUUID from '../utils/generateUUID';

import { characterInFightModel } from './charakterInFightModel';

import { characterModel, ICharacterModel, characterInitialDataType } from './characterModel';
import { fightModel } from './fightModel';
import { autorun } from '../../node_modules/mobx';

const jsonCharacters = localStorage.getItem('animaCharacters');

let savedCharacters;

if (jsonCharacters) {
  try {
    savedCharacters = JSON.parse(jsonCharacters);
  } catch (e) {} // tslint:disable-line
}

const initialData = {
  characters: savedCharacters || [],
  fight: {
    phase: 'new'
  }
};

const appStoreConstructor = types
  .model('appStore', {
    characters: types.array(characterModel),
    fight: fightModel,
    idCounter: 0
  })
  .actions(self => ({
    addCharacter(characterData: characterInitialDataType) {
      characterData.id = generateUUID();
      self.characters.push(characterModel.create(characterData));
    },
    deleteCharacter(character: ICharacterModel) {
      const characterInFight = self.fight.fightingCharacters.find(fightChar => fightChar.baseCharacter === character);
      if (characterInFight) {
        destroy(characterInFight);
      }
      destroy(character);
    },
    addCharacterToFight(id: string) {
      const baseCharacter = self.characters.find(char => char.id === id);
      if (baseCharacter) {
        const characterInFight = characterInFightModel.create({ baseCharacter });
        if (characterInFight.baseCharacter.group === 'nsc') {
          characterInFight.rolld100();
        }
        self.fight.fightingCharacters.push(characterInFight);
      }
    }
  }))
  .views(self => ({
    get charactersNotInFight() {
      return self.characters.filter(
        char => !self.fight.fightingCharacters.find(fightingChar => fightingChar.baseCharacter.id === char.id)
      );
    }
  }));

export const appStore = appStoreConstructor.create(initialData);

onPatch(appStore, () => {
  localStorage.setItem('animaCharacters', JSON.stringify(appStore.characters));
});

let nextCharacterByKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'n') {
    appStore.fight.nextCharacter();
  }
};

autorun(() => {
  if (appStore.fight.phase === 'turn') {
    window.addEventListener('keypress', nextCharacterByKeyboard);
  }
  if (appStore.fight.phase === 'new') {
    window.removeEventListener('keypress', nextCharacterByKeyboard);
  }
});
