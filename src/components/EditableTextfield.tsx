import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { FaPencil, FaCheck } from 'react-icons/lib/fa';

import { Button } from 'reactstrap';

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
        <Button color="link" onClick={this.toggleIsEditable}>
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
        <input type={usedType} defaultValue={text} ref={ref => (this.inputRef = ref)} />
        <Button size="xsmall" onClick={this.toggleIsEditable}>
          &times;
        </Button>
        <Button size="xsmall" onClick={this.saveChanges}>
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
