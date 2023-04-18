import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onEscPress);
    window.addEventListener('click', this.onBackdropClick);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
    window.removeEventListener('click', this.onBackdropClick);
  }

  onEscPress = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onBackdropClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.toggleModal();
    }
  };

  render() {
    const { urlItem } = this.props;
    return (
      <Overlay>
        <ModalWindow>
          <img src={urlItem} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
