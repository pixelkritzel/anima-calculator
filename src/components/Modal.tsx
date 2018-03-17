import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

type IModalProps = {
  children: JSX.Element | string;
  isModalOpen?: boolean;
  onClose?: () => void;
};

@observer
class CharacterForm extends React.Component<IModalProps, {}> {
  @observable isModalOpen: boolean = true;

  closeModal = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.isModalOpen = false;
  };

  render() {
    if (this.props.isModalOpen) {
      this.isModalOpen = this.props.isModalOpen;
    }
    return (
      <Modal show={this.isModalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body />
        {this.props.children}
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CharacterForm;
