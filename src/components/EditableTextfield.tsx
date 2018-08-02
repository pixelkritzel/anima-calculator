import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FaPencil, FaCheck } from 'react-icons/lib/fa';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

type IEditableTextfieldProps = {
  onSave?: (value: string) => void;
  text: string;
  type?: string;
};

@observer
class EditableTextfield extends React.Component<IEditableTextfieldProps, {}> {
  @observable isEditable = false;

  inputRef: HTMLInputElement | null;

  toggleIsEditable = () => {
    this.isEditable = !this.isEditable;
  };

  saveChanges = () => {
    const { onSave } = this.props;
    if (onSave && this.inputRef) {
      onSave(this.inputRef.value);
    }
    this.toggleIsEditable();
  };

  displayText = () => {
    const { text } = this.props;
    return (
      <span>
        {text}{' '}
        <Button variant="text" onClick={this.toggleIsEditable}>
          <FaPencil />
        </Button>
      </span>
    );
  };

  displayInput = () => {
    const { text, type } = this.props;
    const usedType = type || 'text';
    return (
      <span>
        <TextField type={usedType} defaultValue={text} inputRef={ref => (this.inputRef = ref)} />
        <Button size="small" onClick={this.toggleIsEditable}>
          &times;
        </Button>
        <Button size="small" onClick={this.saveChanges}>
          <FaCheck />
        </Button>
      </span>
    );
  };

  render() {
    return <span>{this.isEditable ? this.displayInput() : this.displayText()}</span>;
  }
}

export default EditableTextfield;
