import styles from './Modal.module.css';

export const Modal = ({ modalImgLarge, closeImg }) => {
  const { Overlay, Modal } = styles;

  return (
    <div className={Overlay} onClick={closeImg}>
      <div className={Modal}>
        <img src={modalImgLarge} alt="" />
      </div>
    </div>
  );
};
