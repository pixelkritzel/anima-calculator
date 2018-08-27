import { applySnapshot, destroy, onPatch, types } from 'mobx-state-tree';
import generateUUID from '../utils/generateUUID';

import { characterModel, ICharacterModel, characterInitialDataType } from '#src/store/characterModel';
import { characterInFightModel } from '#src/store/charakterInFightModel';
import { fightModel } from '#src/store/fightModel';

const jsonCharacters = localStorage.getItem('animaCharacters');

let savedCharacters;

if (jsonCharacters) {
  try {
    savedCharacters = JSON.parse(jsonCharacters);
  } catch (e) {} // tslint:disable-line
}

const initialData = {
  activeTab: 'charactersView',
  characters: [],
  fight: {
    phase: 'new'
  }
};

const storeConstructor = types
  .model('store', {
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

if (savedCharacters) {
  try {
    applySnapshot(store, savedCharacters);
  } catch (e) {
    localStorage.removeItem('animaCharacters');
  }
}

export const applyImportedData = (data: { foo: object }) => applySnapshot(store, data);

onPatch(store, () => {
  localStorage.setItem('animaCharacters', JSON.stringify(store));
});
