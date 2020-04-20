import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import IconCheck from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';

import AppModal from '#src/components/AppModal';

import { IModifierData, IModifierModel, ModifierModel } from '#src/store/modifierModel';
import { IStore } from '#src/store';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type IModifiersProps = {
  modifiers: IModifierModel[];
  addModifier: (modifierData: IModifierData) => void;
  removeModifier: (is: string) => void;
  store?: IStore;
};

@inject('store')
@observer
export default class Modifiers extends React.Component<IModifiersProps, {}> {
  @observable
  showModifierModal = false;

  @observable
  isSaveModifier = true;

  @observable
  modifier = {
    changePerTurn: 0,
    reason: '',
    value: 0,
  };

  addModifier = (event: React.FormEvent) => {
    event.preventDefault();
    const { store } = this.props;
    const modifier = ModifierModel.create({ ...this.modifier });
    store!.saveModifier(modifier);
    this.props.addModifier(modifier);
    this.showModifierModal = false;
  };

  selectModifier = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    if (!id) {
      return;
    }
    const { addModifier, store } = this.props;
    const { modifiers } = store!;
    const selectedModifier = modifiers.find(mod => mod.id === id);
    addModifier(selectedModifier!);
    this.showModifierModal = false;
  };

  toggleSaveModifier = () => (this.isSaveModifier = !this.isSaveModifier);

  renderModifierModal() {
    const { modifiers } = this.props.store!;
    return (
      <AppModal modalTitle={`Add modifier`} open onClose={() => (this.showModifierModal = false)}>
        <FormControl fullWidth>
          <InputLabel htmlFor="preexisting-modifier">Preexisting modifiers</InputLabel>
          <Select
            onChange={this.selectModifier}
            inputProps={{
              name: 'preexisting-modifier',
              id: 'preexisting-modifier',
            }}
          >
            <MenuItem value="" key="none">
              <em>None</em>
            </MenuItem>
            {modifiers.map(mod => (
              <MenuItem key={mod.id} value={mod.id}>
                {mod.reason + ': ' + mod.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <form onSubmit={this.addModifier}>
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

          <FormControl margin="normal">
            <Button onClick={this.addModifier}>
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
