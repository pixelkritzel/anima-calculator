import * as React from 'react';

class CharacterForm extends React.Component {
  render() {
    return (
      <form>
        <FormGroup controlId="charachterForm-name">
          <ControlLabel>Character name</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

export default CharacterForm;
