import React from 'react';
import './DeletionModal.css';

export const DeletionModal = ({ setDelete, onCancel, onDelete }) => {
//   if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="icon-box">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 8H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V8Z" fill="#e55a5a"/>
            <circle cx="18" cy="4" r="1" fill="#e55a5a" />
            <circle cx="21" cy="7" r="0.5" fill="#e55a5a" />
            <circle cx="4" cy="5" r="1" fill="#e55a5a" />
          </svg>
        </div>

        <h2>Confirm Service Deletion?</h2>
        <p>Are you sure you want to delete this service?<br />This action cannot be undone.</p>

        <div className="button-group">
          <button className="btn btn-cancel" onClick={()=>setDelete(false)}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

