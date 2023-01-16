import styles from './modal-overlay.module.scss';

function ModalOverlay( props: {closeModal: () => void }) {
    return(
        <div className={styles.modal_overlay} onClick={props.closeModal}></div>
    );
}

export default ModalOverlay;