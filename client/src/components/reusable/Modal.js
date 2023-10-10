import React from "react";

function Modal({ isOpen, closeModal, closeOnOverlayClick, children }) {
  // Render nothing if the modal is not open
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      closeModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-gray-800 opacity-50"
        onClick={handleOverlayClick}
      ></div>
      <div className="z-10 bg-white p-4 rounded shadow-lg">{children}</div>
    </div>
  );
}

export default Modal;
