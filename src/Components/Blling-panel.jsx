import { useState } from 'react';
import { BillingProduct } from './BillingProduct';
import './Blling-panel.css';
import { PaymentSelect } from './PaymentSelect';
import { BillTemplate } from './BillTemplate';
import emptyImage from '../../public/emptycart.png'
import { PrintingAnimation } from './printingAnimation';
import BillingProductEdit from './BillingProductEdit';

export function BillingPanel({ satatus, setStatus , cartItems, setCartItems }) {

  
  const [editProductForBill, serEditProductForBill] = useState({})
  const [productIdx, setProductIdx] = useState()
  const [baseRate, setBaseRate] = useState()
  const [selectedMethod, setSelectedMethod] = useState(null);

  // States for dynamic Tax
  const [taxRate, setTaxRate] = useState(0); 
  const [isEditingTax, setIsEditingTax] = useState(false);
  
  // State for Custom Popup Error
  const [showError, setShowError] = useState(false);

  const findBaseRate = (baseRate) => {
    setBaseRate(baseRate)
  }

  const onAddToCart = (quantity) => {
    const updatedItems = [...cartItems];
    updatedItems[productIdx] = {
      ...updatedItems[productIdx],
      quantity: quantity.quantity,
      sellingRate: quantity.price
    };
    setCartItems(updatedItems);
    setStatus('bill')
  }

  function EditProductForBill(product, index) {
    serEditProductForBill({ prodictInfo: product, index: index })
  }

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart); 
  };

  // Logic for Pay Now with Popup check
  const handlePayNow = () => {
    if (cartItems.length === 0) {
      setShowError(true); // Trigger the custom popup
      return;
    }
    setStatus('payment');
  }

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.sellingRate * (item.quantity || 1)), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const netPayable = subtotal + taxAmount;

  return (
    <aside className="checkout-sidebar">
      
      {/* CUSTOM ERROR POPUP */}
      {showError && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <i className="bi bi-exclamation-circle" style={{fontSize: '2rem', color: '#ff4d4f'}}></i>
            <h3>Empty Cart</h3>
            <p>Please add at least one product to create a bill.</p>
            <button className="close-popup-btn" onClick={() => setShowError(false)}>Got it</button>
          </div>
        </div>
      )}

      {satatus === 'bill' ?
        <>
          <div className="cart-header">
            <div>
              <h2>Add TO Cart</h2>
              <span>Add product to the cart list</span>
            </div>
            <div className='row'>
              <i className="bi bi-arrow-counterclockwise" style={{cursor: 'pointer'}} onClick={() => setCartItems([])}></i>
            </div>
          </div>

          <div className="checkout-header">
            <div style={{ width: '55%' }}><small>Product</small></div>
            <div style={{ width: '20%' }}><small>Qut</small></div>
            <div><small>Price</small></div>
          </div>

          <div className="cart-list">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <BillingProduct 
                  key={index}
                  removeItem={removeItem} 
                  baseRate={baseRate} 
                  setProductIdx={setProductIdx} 
                  index={index} 
                  item={item} 
                  setStatus={setStatus} 
                  EditProductForBill={EditProductForBill} 
                />
              ))
            ) : (
              <div className="empty-cart-msg">
                <img src={emptyImage} alt="Empty Cart" />
              </div>
            )}
          </div>

          <div className="checkout-footer">
            <div className="summary-line">
              <span>Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>

            {/* Dynamic Tax Row */}
            <div className="summary-line">
              <span>
                Tax 
                {isEditingTax ? (
                  <span style={{ marginLeft: '5px' }}>
                    <input 
                      type="number" 
                      value={taxRate === 0 ? '' : taxRate} 
                      placeholder="0"
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      onBlur={() => setIsEditingTax(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingTax(false)}
                      autoFocus
                      style={{
                        width: '50px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        fontSize: '12px',
                        textAlign: 'center',
                        outline: 'none'
                      }}
                    />
                    %
                  </span>
                ) : (
                  <span 
                    onClick={() => setIsEditingTax(true)} 
                    style={{ cursor: 'pointer', color: '#007bff', marginLeft: '5px' }}
                  >
                    {taxRate > 0 ? `(${taxRate}%)` : '(Add)'}
                  </span>
                )}
              </span>
              <span>{taxAmount.toFixed(2)}</span>
            </div>

            <div className="summary-line total-line">
              <span>Net Payable</span>
              <span>{netPayable.toFixed(2)}</span>
            </div>

            <button className="create-order-btn" onClick={handlePayNow}>Pay Now</button>
          </div>
        </> 
        : satatus === 'payment' ?
          <PaymentSelect netPayable={netPayable} setStatus={setStatus} setSelectedMethod={setSelectedMethod} selectedMethod={selectedMethod} /> 
        : satatus === 'receipt' ?
          <BillTemplate cartItems={cartItems} setStatus={setStatus} setCartItems={setCartItems} selectedMethod={selectedMethod} taxAmount={taxAmount} taxRate={taxRate} />
        : satatus === 'billingProductEdit' ? 
          <BillingProductEdit findBaseRate={findBaseRate} onAddToCart={onAddToCart} editProductForBill={editProductForBill} setStatus={setStatus} /> 
        : ''}
    </aside>
  );
}