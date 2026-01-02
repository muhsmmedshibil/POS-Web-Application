import { useState } from 'react';
import { BillingProduct } from './BillingProduct';
import './Blling-panel.css';
import { PaymentSelect } from './PaymentSelect';
import { BillTemplate } from './BillTemplate';
import emptyImage from '../../public/emptycart.png'
import { PrintingAnimation } from './printingAnimation';
import BillingProductEdit from './BillingProductEdit';

export function BillingPanel({ cartItems, setCartItems }) {

  const [satatus, setStatus] = useState('bill')
  const[editProductForBill,serEditProductForBill]=useState({})

  function EditProductForBill(product){
    serEditProductForBill(product)
  }


  const subtotal = cartItems.reduce((acc, item) => acc + item.price * 1, 0);
  const tax = subtotal * 0.10;
  const netPayable = subtotal + tax;

  return (
    <aside className="checkout-sidebar">

      {satatus == 'bill' ?
        <>
          <div class="cart-header">
            <div>
              <h2>Current Bills</h2>
              <span>Table 4 • Customer: Walk-In</span>
            </div>
            <div className='row'>
              <i class="bi bi-arrow-counterclockwise" onClick={()=>setCartItems([])}></i>
            </div>
          </div>


          <div className="checkout-header">
            <div style={{ width: '45%' }}><small>Product</small></div>
            <div style={{ width: '20%' }}><small>Qut</small></div>
            <div><small>Price</small></div>

          </div>


          <div className="cart-list">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <BillingProduct item={item} setStatus={setStatus} EditProductForBill={EditProductForBill}/>
              ))
            ) : (
              <div className="empty-cart-msg">
                <img src={emptyImage} alt="" />
              </div>
            )}
          </div>

          <div className="checkout-footer">
            <div className="summary-line">
              <span>Total</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (10%)</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total-line">
              <span>Net Payable</span>
              <span>{netPayable.toFixed(2)}</span>
            </div>

            {/* <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
              <input type="checkbox" defaultChecked />
              <span>Print Receipt</span>
            </label> */}

            <button className="create-order-btn" onClick={() => { setStatus('payment') }}>Pay Now</button>
          </div></> :
        satatus == 'payment' ?
          <PaymentSelect netPayable={netPayable} setStatus={setStatus} /> :
          satatus == 'receipt' ?
            <BillTemplate cartItems={cartItems} setStatus={setStatus} setCartItems={setCartItems} />
            // satatus == 'printBill' ? <PrintingAnimation />
            : satatus == 'billingProductEdit' ? <BillingProductEdit editProductForBill={editProductForBill} setStatus={setStatus}/> : ''}
    </aside>
  );
}