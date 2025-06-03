import React from "react";
import "./index.css";

function Modal({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-message">{message}</div>
        <button className="modal-close-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;
