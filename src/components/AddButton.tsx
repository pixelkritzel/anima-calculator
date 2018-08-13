import * as React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';

type IAddButtonProps = {
  onAdd: () => void;
};

export default class AddButton extends React.Component<IAddButtonProps, {}> {
  render() {
    return (
      <div className="add-button">
        <Zoom in unmountOnExit>
          <Button variant="fab" color="primary" onClick={this.props.onAdd}>
            <AddIcon />
          </Button>
        </Zoom>
      </div>
    );
  }
}
