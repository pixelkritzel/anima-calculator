import { applySnapshot, destroy, onPatch, types } from 'mobx-state-tree';
import generateUUID from '../utils/generateUUID';

import { characterModel, ICharacterModel, characterInitialDataType } from '#src/store/characterModel';
import { characterInFightModel } from '#src/store/charakterInFightModel';
import { fightModel } from '#src/store/fightModel';
import updateJSON from '#src/store/updateJSON';

export const JSON_VERSION = 1;

const initialData = {
  version: JSON_VERSION,
  activeTab: 'charactersView',
  characters: [],
  fight: {
    phase: 'new'
  }
};

const storeConstructor = types
  .model('store', {
    version: types.literal(JSON_VERSION),
    activeTab: types.enumeration(['charactersView', 'fightView']),
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
        characterInFight.rolld100();
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
    setActiveTab(value: 'charactersView' | 'fightView') {
      self.activeTab = value;
    }
  }));

export type IStore = typeof storeConstructor.Type;
export const store = storeConstructor.create(initialData);

// tslint:disable-next-line no-any
export const applyImportedData = (data: any) => {
  updateJSON(data);
  applySnapshot(store, data);
};

const jsonFormLocalStorage = localStorage.getItem('animaCharacters');

let savedData;

if (jsonFormLocalStorage) {
  try {
    savedData = JSON.parse(jsonFormLocalStorage);
    savedData.version = savedData.version || 0;
  } catch (e) {} // tslint:disable-line
}

console.log(savedData);

if (savedData) {
  try {
    applyImportedData(savedData);
  } catch (e) {
    console.log(e);
  }
}

onPatch(store, () => {
  localStorage.setItem('animaCharacters', JSON.stringify(store));
});
