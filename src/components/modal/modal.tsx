import { FC, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from '../../utils/constants';
import { IModal } from '../../utils/types';

const modalRoot = document.getElementById('react-modals') as Element;

export const Modal: FC<IModal> = ({ children, title, closeModal }) => {
  const escCloseModal = (e: KeyboardEvent) => {
    if (e.keyCode === ESC_KEYCODE) closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal);
    };
  }, []);

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className="text text_type_main-large">{title}</h1>
          <button
            type="button"
            aria-label="Закрыть"
            className={`${styles['btn-close']}`}
            onClick={closeModal}
            data-testid="modal-close-btn"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
};
