import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import Close from '../../../assets/icons/close.svg?react';
import classes from './Modal.module.scss';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  return isOpen 
    ? createPortal(
        <div className={classes.overlay}>
          <div className={classes.modal}>
            {children}
            <Close className={classes.close} onClick={onClose} />
          </div>
        </div>,

        document.getElementById('root')!
      )
    : null;
};

export default Modal;
