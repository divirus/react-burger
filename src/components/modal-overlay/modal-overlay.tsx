import PropTypes from "prop-types";
import styles from "./modal-overlay.scss";

export const ModalOverlay = (onClick: any) => {
    return <div className={styles.overlay} onClick={onClick} />
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func,
}