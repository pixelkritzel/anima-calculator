import * as React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

type IAddButtonProps = {
  onAdd: () => void;
};

export default class AddButton extends React.Component<IAddButtonProps> {
  render() {
    return (
      <div className="add-button">
        <Zoom in unmountOnExit>
          <Fab color="primary" aria-label="add" onClick={this.props.onAdd}>
            <AddIcon />
          </Fab>
        </Zoom>
      </div>
    );
  }
}
