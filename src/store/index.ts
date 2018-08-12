import { applySnapshot, destroy, onPatch, types } from 'mobx-state-tree';
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
  activeTab: 'charactersPane',
  characters: [],
  fight: {
    phase: 'new'
  }
};

const appStoreConstructor = types
  .model('appStore', {
    activeTab: types.enumeration(['charactersPane', 'fightPane']),
    characters: types.array(characterModel),
    fight: fightModel,
    idCounter: 0
  })
  .views(self => ({
    get charactersNotInFight() {
      return self.characters.filter(
        char => !self.fight.fightingCharacters.find(fightingChar => fightingChar.baseCharacter.id === char.id)
      );
    }
  }))
  .actions(self => ({
    addCharacter(characterData: characterInitialDataType) {
      characterData.id = generateUUID();
      self.characters.push(characterModel.create(characterData));
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
    },
    deleteCharacter(character: ICharacterModel) {
      const characterInFight = self.fight.fightingCharacters.find(fightChar => fightChar.baseCharacter === character);
      if (characterInFight) {
        destroy(characterInFight);
      }
      destroy(character);
    },
    setActiveTab(value: 'charactersPane' | 'fightPane') {
      self.activeTab = value;
    }
  }));

export const appStore = appStoreConstructor.create(initialData);

if (savedCharacters) {
  try {
    applySnapshot(appStore, savedCharacters);
  } catch (e) {
    localStorage.removeItem('animaCharacters');
  }
}

export const applyImportedData = (data: object) => applySnapshot(appStore, data);

onPatch(appStore, () => {
  localStorage.setItem('animaCharacters', JSON.stringify(appStore));
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
