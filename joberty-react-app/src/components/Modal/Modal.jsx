import ReactModal from "react-modal";
import CloseIcon from "../../assets/close.svg";
import styles from "./Modal.module.scss";

const Modal = ({ content, isOpenModal, changeModalState }) => {
  return (
    <>
      <ReactModal
        isOpen={isOpenModal}
        ariaHideApp={false}
        contentLabel="Minimal Modal Example"
        style={{
          overlay: {
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            alignContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <button onClick={changeModalState} className={styles.closeButton}>
          <img src={CloseIcon} />
        </button>
        {content}
      </ReactModal>
    </>
  );
};

export default Modal;
