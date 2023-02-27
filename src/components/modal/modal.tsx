import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root')!;

function Modal(props: {children: React.ReactNode, header: string | null, closeModal: () => void}) {
    
    const handleEscKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.closeModal();
            e.stopImmediatePropagation();
        }
    }, [props])

    useEffect(() => {
        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [handleEscKey]); 

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal} />
            <div className={styles.container + ' pl-10 pt-10 pr-10 pb-15'}>
                <h3 className={styles.header + ' text text_type_main-large'}>
                    {props.header}
                </h3>
                <span className={ `${styles.close_icon}` } >
                    <CloseIcon type='primary' onClick={props.closeModal} />
                </span>
                {props.children}
            </div>
        </>, 
        modalRoot
    );
}

export default Modal;