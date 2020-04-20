import { applySnapshot, destroy, onPatch, types, SnapshotIn } from 'mobx-state-tree';

import { characterModel, ICharacterModel, ICharacterModelData } from '#src/store/characterModel';
import { characterInFightModel } from '#src/store/charakterInFightModel';
import { fightModel } from '#src/store/fightModel';
import updateJSON from '#src/store/updateJSON';
import { ModifierModel, IModifierModel } from './modifierModel';

export const LAST_JSON_VERSION = 2;

const initialData = {
  activeTab: 'charactersView',
  characters: [],
  fight: {
    phase: 'new',
    fightingCharacters: [],
  },
  modifiers: [
    {
      id: 'modifier-unarmed',
      value: 20,
      reason: 'Unarmed',
    },
  ],
} as IStoreData;

const storeConstructor = types
  .model('store', {
    version: LAST_JSON_VERSION,
    activeTab: types.enumeration(['charactersView', 'fightView']),
    characters: types.array(characterModel),
    fight: fightModel,
    modifiers: types.array(ModifierModel),
  })
  .views(self => ({
    get charactersNotInFight() {
      return self.characters.filter(
        char =>
          !self.fight.fightingCharacters.find(
            fightingChar => fightingChar.baseCharacter.id === char.id
          )
      );
    },
  }))
  .actions(self => ({
    addCharacter(characterData: ICharacterModelData) {
      self.characters.push(characterModel.create(characterData));
    },
    addCharacterToFight(characterId: ICharacterModel['id']) {
      const characterInFight = characterInFightModel.create({
        baseCharacter: characterId,
        inititiaveModifiers: ['modifier-unarmed'],
      });
      characterInFight.rolld100();
      self.fight.fightingCharacters.push(characterInFight);
    },
    deleteCharacter(character: ICharacterModel) {
      const characterInFight = self.fight.fightingCharacters.find(
        fightChar => fightChar.baseCharacter === character
      );
      if (characterInFight) {
        destroy(characterInFight);
      }
      destroy(character);
    },
    saveModifier(modifier: IModifierModel) {
      self.modifiers.push(modifier);
    },
    setActiveTab(value: 'charactersView' | 'fightView') {
      self.activeTab = value;
    },
  }));

export type IStore = typeof storeConstructor.Type;
export type IStoreData = SnapshotIn<typeof storeConstructor>;
export const store = storeConstructor.create(initialData);

// tslint:disable-next-line no-any
export const applyImportedData = (data: any) => {
  data.version = data.version || 0;
  updateJSON(data);
  console.log(JSON.stringify(data, undefined, 4));
  applySnapshot(store, data);
};

const jsonFormLocalStorage = localStorage.getItem('animaCharacters');

let savedData;

if (jsonFormLocalStorage) {
  try {
    savedData = JSON.parse(jsonFormLocalStorage);
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
