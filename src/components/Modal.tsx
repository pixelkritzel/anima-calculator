import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
      <Modal isOpen={this.isModalOpen} onExit={this.closeModal}>
        <ModalHeader>Modal heading</ModalHeader>
        <ModalBody />
        {this.props.children}
        <ModalFooter>
          <Button onClick={this.closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CharacterForm;
