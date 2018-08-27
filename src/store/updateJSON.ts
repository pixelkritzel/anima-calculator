import { JSON_VERSION } from '#src/store';

/* tslint:disable no-any */
const jsonConverters = {
  1: function(json: any) {
    json.fight.fightingCharacters.forEach((character: any) => {
      character.inititiaveModifiers = character.modifiers;
      delete character.modifiers;
    });
    json.version! = 1;
  }
};

function updateJSON(json: any) {
  for (let i = json.version + 1; i <= JSON_VERSION; i++) {
    console.log('Convert json to version: ' + i);
    jsonConverters[i](json);
  }
}
/* tslint:enable */

export default updateJSON;
