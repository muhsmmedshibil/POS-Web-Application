import React, { useState, useEffect } from "react";
import "./BillingProductEdit.css";

const BillingProductEdit = ({ findBaseRate, setStatus, onAddToCart, editProductForBill }) => {
  console.log(editProductForBill, 'lllllllllll')

  const baseRate = editProductForBill.prodictInfo.sellingRate;
  console.log(baseRate, 'lkkkkkkkkkkkkkkk')
  const productIdx = editProductForBill.index

  const [quantity, setQuantity] = useState(editProductForBill.prodictInfo.quantity);
  const [discount, setDiscount] = useState(0);
  const [extra, setExtra] = useState(0);
  const [price, setPrice] = useState(baseRate);

  useEffect(() => {
    const calculated = baseRate * quantity + Number(extra) - Number(discount);
    setPrice(calculated >= 0 ? calculated : 0); // No negative price
  }, [quantity, discount, extra, baseRate]);
  findBaseRate(baseRate)

  const handleIncrement = () =>
    setQuantity((q) => Math.max(1, q + 1));

  const handleDecrement = () =>
    setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="modalContainer">
      <header className="modal-header">
        <div className="header-left">
          <i className="bi bi-x-lg close-btn" onClick={() => setStatus("bill")}></i>
          <h2>{editProductForBill.prodictInfo.productName}</h2>
        </div>
        <button
          className="btn-add"
          onClick={() =>
            onAddToCart({ quantity, discount, extra, price, productIdx })
          }
        >
          Add to Cart
        </button>
      </header>

      <div className="modal-body">
        <div className="product-visual">
          <div className="img-display">
            <img src={editProductForBill.prodictInfo.image} alt="" />
          </div>


          <div className="qty-box">
            <button className="qty-btn" onClick={handleDecrement}>
              −
            </button>
            <span id="qty-val">{quantity}</span>
            <button className="qty-btn" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>

        <div className="info-line">
          <span className="key">productID</span>
          <span className="val">{editProductForBill.prodictInfo.productID}</span>
        </div> <div className="info-line">
          <span className="key">Category</span>
          <span className="val">{editProductForBill.prodictInfo.category}</span>
        </div>

        <hr className="divider" />


        {/* <div className="input-row">
          <label>Discount</label>
          <input
            type="number"
            className="styled-input"
            value={discount}
            min="0"
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </div> */}

        <div className="input-row">
          <label>Extra Charges</label>
          <input
            type="number"
            className="styled-input"
            value={extra}
            min="0"
            onChange={(e) => setExtra(Number(e.target.value))}
          />
        </div>

        <div className="input-row">
          <label>Last Price</label>
          <div className="price-wrapper">
            <span className="currency">₹</span>
            <input
              type="number"
              className="styled-input"
              value={price}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingProductEdit;
