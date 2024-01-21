import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, closeModal }) => {
  const onOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal()
  }
  return (
    <div
      className={`${styles.overlay} modal-overlay`}
      onClick={onOverlayClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
