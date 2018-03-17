import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Glyphicon } from 'react-bootstrap';

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
        <Button bsStyle="link" onClick={this.toggleIsEditable}>
          <Glyphicon glyph="pencil" />
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
        <Button bsSize="xsmall" onClick={this.toggleIsEditable}>
          <Glyphicon glyph="remove" />
        </Button>
        <Button bsSize="xsmall" onClick={this.saveChanges}>
          <Glyphicon glyph="ok" />
        </Button>
      </span>
    );
  };

  render() {
    return <span>{this.isEditable ? this.displayInput() : this.displayText()}</span>;
  }
}

export default EditableTextfield;
