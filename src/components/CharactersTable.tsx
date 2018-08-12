import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { applyImportedData, appStore } from '../store';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CharacterTableRow from './CharacterTableRow';
import CharacterAddForm from './CharacterAddForm';

@observer
class CharactersTable extends React.Component {
  @observable showAddUserForm = false;

  getURLEncodedJSON() {
    const serializedAppStore = JSON.stringify(appStore);
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(serializedAppStore);
  }

  readFile(event: React.ChangeEvent<HTMLInputElement>) {
    var files = event.target.files; // FileList object
    if (files) {
      const reader = new FileReader();

      reader.onload = fileEvent => {
        if (fileEvent.target) {
          try {
            const json = JSON.parse(fileEvent.target.result);
            applyImportedData(json);
          } catch (e) {} // tslint:disable-line
        }
      };
      reader.readAsText(files[0]);
    }
  }
  render() {
    return (
      <div>
        <Button component="a" href={this.getURLEncodedJSON()} download="anima.json">
          Export
        </Button>
        <label htmlFor="import-json">
          <Button component="span">Import</Button>
        </label>
        <input type="file" id="import-json" onChange={this.readFile} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Base Initiative</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appStore.characters.map((character, index: number) => (
              <CharacterTableRow key={`charakter-${index}`} index={index} character={character} />
            ))}
          </TableBody>
        </Table>

        <CharacterAddForm />
      </div>
    );
  }
}

export default CharactersTable;
