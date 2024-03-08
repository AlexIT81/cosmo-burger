import { FC } from 'react';
import styles from './modal-overlay.module.css';
import { IModalOverlay } from '../../utils/types';

export const ModalOverlay: FC<IModalOverlay> = ({ children, closeModal }) => {
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('modal-overlay')) closeModal();
  };
  return (
    <div className={`${styles.overlay} modal-overlay`} onClick={onOverlayClick} role="button" tabIndex={0}>
      {children}
    </div>
  );
};