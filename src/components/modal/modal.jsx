import React, { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, title, closeModal }) => {
  const escCloseModal = (e) => {
    if (e.keyCode === 27) closeModal();
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
