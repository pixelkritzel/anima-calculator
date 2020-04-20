import * as React from 'react';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import IconClose from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

type IAppModalProps = {
  ariaDescription?: string;
  ariaLabelledBy?: string;
  modalTitle: string;
  open: boolean;
  onClose: () => void;
};

export default class AppModal extends React.Component<IAppModalProps, {}> {
  render() {
    const {
      ariaDescription = '',
      ariaLabelledBy = '',
      children,
      modalTitle,
      onClose,
      open,
    } = this.props;
    return (
      <Modal
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescription}
        onClose={onClose}
        open={open}
      >
        <Paper className="modal">
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="title" id="modal-title">
                {modalTitle}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <IconClose />
              </IconButton>
            </Grid>
          </Grid>
          {children}
        </Paper>
      </Modal>
    );
  }
}
