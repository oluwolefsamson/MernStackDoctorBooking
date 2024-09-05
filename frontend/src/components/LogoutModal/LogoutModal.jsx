// src/components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Logout Confirmation</h3>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Yes, Logout
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
