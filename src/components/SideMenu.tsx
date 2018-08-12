import * as React from 'react';
import { observer } from 'mobx-react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { appStore, applyImportedData } from 'src/store';

// Don't ask why ... https://github.com/mui-org/material-ui/issues/12486#issuecomment-412351212
function LabelForImportJSON({ children, ...otherProps }: { children: React.ReactNode }) {
  return (
    <label htmlFor="import-json" {...otherProps}>
      {children}
    </label>
  );
}

@observer
export default class SideMenu extends React.Component {
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
          } catch (e) {
            alert('This file was not valid. :-/');
          }
        }
      };
      reader.readAsText(files[0]);
    }
  }

  render() {
    return (
      <Drawer className="drawer" variant="permanent">
        <List component="nav">
          <ListItem button component="a" href={this.getURLEncodedJSON()} download="anima.json">
            <ListItemText primary="Export" />
          </ListItem>
          <ListItem button component={LabelForImportJSON}>
            <ListItemText primary="Import" />
          </ListItem>
          <input className="visually-hidden" type="file" id="import-json" onChange={this.readFile} />
        </List>
      </Drawer>
    );
  }
}
