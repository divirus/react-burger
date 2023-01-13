import PropTypes from 'prop-types';
import styles from './modal-overlay.module.scss';

function ModalOverlay( props: {closeModal: () => void }) {
    return(
        <div className={styles.modal_overlay} onClick={props.closeModal}></div>
    );
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;