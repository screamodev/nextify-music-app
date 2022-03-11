import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import "./modal.scss";

function Modal({ isOpen, children }) {
  const initialOverlay = {
    opacity: 0,
  };

  const overlayAnimation = {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  };

  const overlayExit = {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  };

  const initialModal = {
    scale: 0,
  };

  const modalAnimation = {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  };

  const modalExit = {
    scale: 0,
    transition: {
      delay: 0.3,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={initialOverlay}
          animate={overlayAnimation}
          exit={overlayExit}
          className="modal-overlay"
        >
          <motion.div
            initial={initialModal}
            animate={modalAnimation}
            exit={modalExit}
            className="modal-window"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
