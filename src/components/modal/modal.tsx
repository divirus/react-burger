import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.scss";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals")!;

const Modal = ( title: string, onClose: any, children: string ) => {
    React.useEffect(() => {
        const handleEsc = (e: {key: string}) => {
            e.key === "Escape" && onClose();
        }

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={`${styles.title} text text_type_main-large`}>
                        {title}
                    </h3>
                    <button className={styles.button} type="button">
                        <CloseIcon type="primary" onClick={onClose} />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onCLose: PropTypes.func.isRequired,
    children: PropTypes.string,
}
