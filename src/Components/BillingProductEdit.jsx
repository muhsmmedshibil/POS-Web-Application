import React, { useState } from 'react';
import './BillingProductEdit.css';

const BillingProductEdit = ({ setStatus, onAddToCart,editProductForBill }) => {
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(53);
  const [price, setPrice] = useState("34.99");

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handlePriceBlur = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val === "") {
      setPrice("0.00");
    } else {
      setPrice(parseFloat(val).toFixed(2));
    }
  };

  return (
    <div className="modalContainer">
      <header className="modal-header">
        <div className="header-left">
          {/* <span className="close-btn" onClick={()=>setStatus('bill')}>&times;</span> */}
          {/* <i class="bi bi-x-circle close-btn" onClick={()=>setStatus('bill')}></i> */}
          <i class="bi bi-x-lg close-btn" onClick={()=>setStatus('bill')}> </i>
          <h2>{editProductForBill.name}</h2>
        </div>
        <button 
          className="btn-add" 
          onClick={() => onAddToCart({ quantity, discount, price })}
        >
          Add to Cart
        </button>
      </header>

      <div className="modal-body">
        <div className="product-visual">
          <div className="img-display">
            <img 
              src={editProductForBill.image}
           
            />
          </div>
          <div className="qty-box">
            <button className="qty-btn" onClick={handleDecrement}>−</button>
            <span id="qty-val">{quantity}</span>
            <button className="qty-btn" onClick={handleIncrement}>+</button>
          </div>
        </div>

        <span className="section-title">Product Info</span>

        <div className="info-line">
          <span className="key">SKU</span>
          <span className="val">12343562</span>
        </div>
        <div className="info-line">
          <span className="key">Tax Group</span>
          <span className="val">Clothing</span>
        </div>

        <hr className="divider" />

        <div className="input-row">
          <label>Discount (%)</label>
          <input 
            type="number" 
            className="styled-input" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label>Sale Price</label>
          <div className="price-wrapper">
            <span className="currency">$</span>
            <input 
              type="text" 
              className="styled-input" 
              value={editProductForBill.price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={handlePriceBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingProductEdit;