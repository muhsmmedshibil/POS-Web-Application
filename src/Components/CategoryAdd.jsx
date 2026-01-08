import React, { useState } from 'react';
import Select from 'react-select';
import * as FA6 from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import './CategoryAdd.css';

// ... (Keywords lists remain the same as previous)
const iconOptions = Object.keys(FA6)
  .map((key) => ({ value: key, icon: FA6[key], category: 'All' })) // Simplified for the demo grid
  .slice(0, 100); // Limiting for performance in this example

const CategoryAdd = ({ setAddform, onClose }) => {
  const [formData, setFormData] = useState({ name: '', description: '', icon: '' });

  // if (!isOpen) return null;

  // Render ONLY the icon
  const formatOptionLabel = ({ icon: IconCmp }) => ( // eslint-disable-line no-unused-vars
    <div className="icon-box-item">
      <IconCmp size={18} />
    </div>
  );

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: state.isFocused ? '#00f2ad' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '4px',
      boxShadow: state.isFocused ? '0 0 15px rgba(0, 242, 173, 0.2)' : 'none',
      '&:hover': { borderColor: '#00f2ad' }
    }),
    menu: (base) => ({
      ...base,
      background: '#1a1d26',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      width: '280px',
      right: 0,
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
    }),
    menuList: (base) => ({
      ...base,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)', // 5 icons across for a tighter look
      gap: '8px',
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'rgba(0, 242, 173, 0.15)' : 'transparent',
      borderRadius: '8px',
      color: state.isFocused ? '#00f2ad' : '#8892b0',
      padding: '12px',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }),
    input: (base) => ({ ...base, color: 'white' }),
    singleValue: (base) => ({ ...base, display: 'flex', justifyContent: 'center' })
  };

  return (
    <div className="premium-overlay" onClick={onClose}>
      <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
        <div className="glow-edge" />

        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h3>Create Category</h3>
              <p>Organize your items with style</p>
            </div>
            <button className="close-btn" onClick={() => setAddform(false)}><IoClose /></button>
          </div>

          <div className="modal-body">
            <div className="input-row">
              <div className="field flex-3">
                <label>Category Name</label>
                <input
                  placeholder="e.g. Luxury Watches"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="field flex-1">
                <label>Icon</label>
                <Select
                  options={iconOptions}
                  getOptionLabel={formatOptionLabel}
                  styles={customStyles}
                  isSearchable={true}
                  placeholder=""
                  components={{ IndicatorSeparator: () => null }}
                  onChange={(opt) => setFormData({ ...formData, icon: opt.value })}
                />
              </div>
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                rows="3"
                placeholder="What belongs in this category?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button className="cancel-link" onClick={() => setAddform(false)}>Discard</button>
            <button className="submit-glow-btn" onClick={() => console.log(formData)}>
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;