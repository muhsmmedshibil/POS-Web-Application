import { useState } from 'react';
import './PaymentSelect.css';

export function PaymentSelect({ netPayable, setStatus }) {
    // Handler for the payment button
    const handlePayment = () => {
        if (setStatus) setStatus('receipt');
    };

    const [pymentSelect, setPymentSelect] = useState({})

    return (
        <div className="payment-container">


            <div className="header">
                <div className="header-left">
                    {/* <span className="back-arrow">←</span>  */}
                    <i class="bi bi-arrow-left back-arrow" onClick={()=>setStatus('bill')}></i>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> Select Payment</span>
                </div>
                {/* <div className="split-container">
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                    </label>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Split</span>
                </div> */}
            </div>

            <div className="amount-section">
                <div className="total-label">Total Amount</div>
                <div className="total-value">₹{netPayable.toFixed(2)}</div>
                {/* <div className="sub-amount">42.88</div> */}
            </div>

            <div className="payment-grid">
                <div className={`payment-card ${pymentSelect.cash == null ? '' : 'active'}`}   onClick={() => setPymentSelect({ cash: (netPayable.toFixed(2)) })}>
                    <span className="icon">💵</span>
                    <span className="card-label">Cash</span>
                    <span className="card-amount">${pymentSelect.cash == null ? '0.00' : pymentSelect.cash}</span>
                </div>
                <div className={`payment-card ${pymentSelect.CreditCard == null ? '' : 'active'}`} onClick={() => setPymentSelect({ CreditCard: (netPayable.toFixed(2)) })}>
                    <span className="icon">💳</span>
                    <span className="card-label">Credit Card</span>
                    <span className="card-amount">${pymentSelect.CreditCard == null ? '0.00' : pymentSelect.CreditCard}</span>
                </div>
                <div className={`payment-card ${pymentSelect.DebitCard == null ? '' : 'active'}`}  onClick={() => setPymentSelect({ DebitCard: (netPayable.toFixed(2)) })}>
                    <span className="icon">💳</span>
                    <span className="card-label">Debit Card</span>
                    <span className="card-amount">${pymentSelect.DebitCard == null ? '0.00' : pymentSelect.DebitCard}</span>
                </div>
                <div className={`payment-card ${pymentSelect.Other == null ? '' : 'active'}`} onClick={() => setPymentSelect({ Other: (netPayable.toFixed(2)) })}>
                    <span className="icon">🏛️</span>
                    <span className="card-label">Other</span>
                    <span className="card-amount">${pymentSelect.Other == null ? '0.00' : pymentSelect.Other}</span>
                </div>
                <div className={`payment-card ${pymentSelect.Wallet == null ? '' : 'active'}`} onClick={() => setPymentSelect({ Wallet: (netPayable.toFixed(2)) })}>
                    <span className="icon">👛</span>
                    <span className="card-label">Wallet</span>
                    <span className="card-amount">${pymentSelect.Wallet == null ? '0.00' : pymentSelect.Wallet}</span>
                </div>
            </div>

            <div className="footer">
                <button
                    className="pay-btn"
                    onClick={handlePayment}
                >
                    Make Payment
                </button>
                {/* <button 
                    className=" btn-secondary" 
                    
                >
                   Go Back 
                </button> */}
            </div>
        </div>
    );
} 