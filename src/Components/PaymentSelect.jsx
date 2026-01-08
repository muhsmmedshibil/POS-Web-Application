import { useState } from 'react';
import './PaymentSelect.css';

export function PaymentSelect({ netPayable, setStatus,selectedMethod, setSelectedMethod }) {
    // 1. States for selection and validation
    
    const [showError, setShowError] = useState(false);

    const formattedTotal = netPayable.toFixed(0);

    // 2. Requirement Logic
    const handlePayment = () => {
        if (!selectedMethod) {
            setShowError(true); // Show the popup
            return;
        }
        
        console.log("Method selected:", selectedMethod);
        if (setStatus) setStatus('receipt');
    };

    // 3. Payment Methods Config for cleaner code
    const methods = [
        { id: 'UPI', label: 'UPI', icon: '📱' },
        { id: 'Cash', label: 'Cash', icon: '💵' },
        { id: 'CreditCard', label: 'Credit Card', icon: '💳' },
        { id: 'DebitCard', label: 'Debit Card', icon: '💳' },
        { id: 'Wallet', label: 'Wallet', icon: '👛' },
        { id: 'Other', label: 'Other', icon: '🏛️' },
    ];

    return (
        <div className="payment-container">
            {/* Simple Popup/Modal */}
            {showError && (
                <div className="modal-overlay">
                    <div className="error-popup">
                        <i className="bi bi-exclamation-circle" style={{fontSize: '2rem', color: '#ff4d4f'}}></i>
                        <p>Please select a payment method before proceeding.</p>
                        <button onClick={() => setShowError(false)}>Got it</button>
                    </div>
                </div>
            )}

            <div className="header">
                <div className="header-left">
                    <i className="bi bi-arrow-left back-arrow" onClick={() => setStatus('bill')}></i>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> Select Payment</span>
                </div>
            </div>

            <div className="amount-section">
                <div className="total-label">Total Amount</div>
                <div className="total-value">₹{formattedTotal}</div>
            </div>

            <div className="payment-grid">
                {methods.map((m) => (
                    <div 
                        key={m.id}
                        className={`payment-card ${selectedMethod === m.id ? 'active' : ''}`} 
                        onClick={() => {
                            setSelectedMethod(m.id);
                            setShowError(false); 
                        }}
                    >
                        <span className="icon">{m.icon}</span>
                        <span className="card-label">{m.label}</span>
                        <span className="card-amount">
                            ₹{selectedMethod === m.id ? formattedTotal : '0.00'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="footer">
                <button className="pay-btn" onClick={handlePayment}>
                    Make Payment
                </button>
            </div>
        </div>
    );
}