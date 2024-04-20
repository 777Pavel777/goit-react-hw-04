import css from './ImageModule.module.css';
import Modal from 'react-modal';

export default function ImageModule({ close, image, state }) {
  return (
    <Modal
      className={css.modal}
      isOpen={state}
      onRequestClose={close}
      contentLabel="Example Modal"
    >
      <img className={css.element} src={image} />
    </Modal>
  );
}
