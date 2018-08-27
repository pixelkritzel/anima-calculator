import { LAST_JSON_VERSION } from '#src/store';

/* tslint:disable no-any */
const jsonConverters = {
  1: function(json: any) {
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
  }
};

function updateJSON(json: any) {
  if (json.version < LAST_JSON_VERSION) {
    for (let i = json.version + 1; i <= LAST_JSON_VERSION; i++) {
      console.log('Convert json to version: ' + i);
      jsonConverters[i](json);
    }
  }
}
/* tslint:enable */

export default updateJSON;
