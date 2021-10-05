/* eslint-disable @typescript-eslint/no-explicit-any */
import { LAST_JSON_VERSION } from 'store';

const jsonConverters: { [key: number]: (json: any) => void } = {
  1: function (json: any) {
    // rename property modifiers on fightingCharacter to inititiaveModifiers
    json.fight.fightingCharacters.forEach((character: any) => {
      character.inititiaveModifiers = character.modifiers;
      delete character.modifiers;
    });
    // add lifepoints property to character abd removes unused modifiers property
    json.characters.forEach((character: any) => {
      character.lifepoints = 0;
      delete character.modifiers;
    });
    delete json.idCounter;
    json.version! = 1;
  },
  2: function (json: any) {
    json.modifiers = [
      {
        id: 'modifier-unarmed',
        value: 20,
        reason: 'Unarmed',
      },
    ];
    json.fight.fightingCharacters.forEach(
      (c: { inititiaveModifiers: []; lifepointsModifiers: [] }) =>
        (c.inititiaveModifiers = c.lifepointsModifiers = [])
    );
    json.version = 2;
  },
};

function updateJSON(json: any) {
  if (json.version < LAST_JSON_VERSION) {
    for (let i = json.version + 1; i <= LAST_JSON_VERSION; i++) {
      console.log('Convert json to version: ' + i);
      jsonConverters[i](json);
    }
  }
}

export default updateJSON;
