import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IconCheck from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';

import AppModal from '#src/components/AppModal';

import { IModifierData, IModifierModel } from '#src/store/modifierModel';

type IModifiersProps = {
  modifiers: IModifierModel[];
  addModifier: (modifierData: IModifierData) => void;
  removeModifier: (is: string) => void;
};

@observer
export default class Modifiers extends React.Component<IModifiersProps, {}> {
  @observable
  showModifierModal = false;

  @observable
  modifier = {
    changePerTurn: 0,
    reason: '',
    value: 0
  };

  saveModifier = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addModifier(this.modifier);
    this.showModifierModal = false;
  };

  renderModifierModal() {
    return (
      <AppModal modalTitle={`Add modifier`} open onClose={() => (this.showModifierModal = false)}>
        <form onSubmit={this.saveModifier}>
          <FormControl fullWidth margin="normal">
            <TextField
              autoFocus
              label="Modfier reason"
              type="text"
              onChange={event => (this.modifier.reason = event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Modfier value"
              type="number"
              onChange={event => (this.modifier.value = parseInt(event.target.value, 10))}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Change per turn"
              type="number"
              onChange={event => (this.modifier.changePerTurn = parseInt(event.target.value, 10))}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button onClick={this.saveModifier}>
              <IconCheck /> Add modifier
            </Button>
          </FormControl>
        </form>
      </AppModal>
    );
  }

  render() {
    const { modifiers, removeModifier } = this.props;
    return (
      <>
        {this.showModifierModal && this.renderModifierModal()}
        <ul className="list-unstyled">
          {modifiers.map((mod, index) => (
            <li key={`charakter-${index}-modifier-${mod.id}`}>
              <Grid container>
                <Grid item>
                  <IconButton onClick={() => removeModifier(mod.id)}>&times;</IconButton>
                </Grid>
                <Grid item>
                  {mod.value}
                  {mod.reason && ' - '}
                  {mod.reason}
                  {mod.changePerTurn !== 0 && (
                    <>
                      <br />
                      {`change: ${mod.changePerTurn} / turn`}
                    </>
                  )}
                </Grid>
              </Grid>
            </li>
          ))}
        </ul>
        <Button size="small" onClick={() => (this.showModifierModal = true)}>
          Add modifier
        </Button>
      </>
    );
  }
}
