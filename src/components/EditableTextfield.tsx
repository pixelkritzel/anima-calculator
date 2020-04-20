import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import IconButton from '@material-ui/core/IconButton';
import IconCheck from '@material-ui/icons/Check';
import IconEdit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

type IEditableTextfieldProps = {
  onSave: (value: string) => void;
  value: string;
  type?: string;
};

@observer
class EditableTextfield extends React.Component<IEditableTextfieldProps, {}> {
  @observable
  isEditable = false;

  inputRef: HTMLInputElement | null;

  toggleIsEditable = () => {
    this.isEditable = !this.isEditable;
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.saveChanges();
  };

  saveChanges = () => {
    const { onSave } = this.props;
    if (onSave && this.inputRef) {
      onSave(this.inputRef.value);
    }
    this.toggleIsEditable();
  };

  displayText = () => {
    const { value } = this.props;
    return (
      <span>
        {value}{' '}
        <IconButton onClick={this.toggleIsEditable}>
          <IconEdit />
        </IconButton>
      </span>
    );
  };

  displayInput = () => {
    const { value, type } = this.props;
    const usedType = type || 'text';
    return (
      <form style={{ display: 'inline-block' }} onSubmit={this.onSubmit}>
        <TextField
          autoFocus
          type={usedType}
          defaultValue={value}
          inputRef={ref => (this.inputRef = ref)}
        />
        <IconButton onClick={this.toggleIsEditable}>&times;</IconButton>
        <IconButton onClick={this.saveChanges}>
          <IconCheck />
        </IconButton>
      </form>
    );
  };

  render() {
    return <span>{this.isEditable ? this.displayInput() : this.displayText()}</span>;
  }
}

export default EditableTextfield;
