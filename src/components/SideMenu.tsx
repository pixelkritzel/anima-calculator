import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { applyImportedData, IStore } from '../store';

// Don't ask why ... https://github.com/mui-org/material-ui/issues/12486#issuecomment-412351212
function LabelForImportJSON({ children, ...otherProps }: { children: React.ReactNode }) {
  return (
    <label htmlFor="import-json" {...otherProps}>
      {children}
    </label>
  );
}

@inject('store')
@observer
export default class SideMenu extends React.Component<{ store?: IStore }, {}> {
  getURLEncodedJSON() {
    const serializedAppStore = JSON.stringify(this.props.store);
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(serializedAppStore);
  }

  readFile(event: React.ChangeEvent<HTMLInputElement>) {
    var files = event.target.files; // FileList object
    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          try {
            const json = JSON.parse(reader.result);
            applyImportedData(json);
          } catch (e) {
            console.log(e);
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
          <input
            className="visually-hidden"
            type="file"
            id="import-json"
            onChange={this.readFile}
          />
        </List>
      </Drawer>
    );
  }
}
