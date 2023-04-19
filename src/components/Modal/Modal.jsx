import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ urlItem, toggleModal }) => {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    const onBackdropClick = e => {
      if (e.target.nodeName !== 'IMG') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', onEscPress);
    window.addEventListener('click', onBackdropClick);

    return () => {
      window.removeEventListener('keydown', onEscPress);
      window.removeEventListener('click', onBackdropClick);
    };
  }, [toggleModal]);

  return (
    <Overlay>
      <ModalWindow>
        <img src={urlItem} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
