import './BillTemplate.css';
import React, { useState } from 'react';
import { PrintingAnimation } from './printingAnimation';
import { SuccessAnimation } from './SuccessAnimation';

export function BillTemplate({ setCartItems, setStatus, cartItems, selectedMethod }) {
    const [printing, setPrinting] = useState(false);
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [customerPhone, setCustomerPhone] = useState('');
    const [shouldPrint, setShouldPrint] = useState(true);
    const [successAnimation, setSuccessAnimation] = useState(false);

    const subTotal = cartItems.reduce(
        (sum, item) => sum + (item.sellingRate * item.quantity),
        0
    );

    const finalTotal = subTotal - discount;

    const handleCreateSale = () => {
        if (shouldPrint) {
            setPrinting(true);
        } else {
            setSuccessAnimation(true);
        }
    };

    return (
        <div className="receipt">
            {/* --- Header Section --- */}
            <div className="cart-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="bi bi-arrow-left back-arrow" onClick={() => setStatus('payment')} style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '18px' }}>
                            Current Bills
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
                            <span>Customer Phone:</span>
                            {!showPhoneInput ? (
                                <strong onClick={() => setShowPhoneInput(true)} style={{ cursor: 'pointer', color: customerPhone ? 'black' : '#007bff', textDecoration: customerPhone ? 'none' : 'underline' }}>
                                    {customerPhone || 'ADD'}
                                </strong>
                            ) : (
                                <input
                                    type="tel"
                                    placeholder="Enter Phone"
                                    value={customerPhone}
                                    autoFocus
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    onBlur={() => setShowPhoneInput(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setShowPhoneInput(false)}
                                    style={{ width: '110px', height: '22px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '4px', padding: '0 5px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <i className="fa-solid fa-print" onClick={() => setPrinting(true)} style={{ cursor: 'pointer' }}></i>
                </div>
            </div>

            {/* --- Bill Content --- */}
            <div className="billsection">
                <div className="stars">*****************************</div>
                <h1>RECEIPT</h1>
                <div className="stars">*****************************</div>

                <div className="flex gap-2">
                    <span>Date: {new Date().toLocaleDateString()}</span>
                    <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>

                {customerPhone && (
                    <div style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>
                        Customer: {customerPhone}
                    </div>
                )}

                <hr className="dashed" />

                <div id="item-list">
                    <div className="item-row header">
                        <span>#</span>
                        <span>Item</span>
                        <span>Qty</span>
                        <span>Price</span>
                    </div>

                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div className="item-row" key={index}>
                                <span>{index + 1}.</span>
                                <span>{item.productName}</span>
                                <span>{item.quantity}</span>
                                <span>₹ {(item.sellingRate * item.quantity).toFixed(0)}</span>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '10px' }}>No items added</p>
                    )}
                </div>

                <hr className="double" />

                <div className="totals">
                    <div className="flex">
                        <span>SUBTOTAL</span>
                        <span>₹ {subTotal.toFixed(0)}</span>
                    </div>

                    <div className="flex">
                        <span>Discount</span>
                        {!showDiscountInput ? (
                            <span onClick={() => setShowDiscountInput(true)} className="add-discount-link">
                                {discount > 0 ? `₹ ${discount}` : 'Add'}
                            </span>
                        ) : (
                            <input
                                type="number"
                                className="discount-input"
                                value={discount}
                                autoFocus
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                onBlur={() => setShowDiscountInput(false)}
                                onKeyDown={(e) => e.key === 'Enter' && setShowDiscountInput(false)}
                            />
                        )}
                    </div>

                    <div className="flex bold">
                        <span>{selectedMethod || "TOTAL"}</span>
                        <span>₹ {finalTotal.toFixed(0)}</span>
                    </div>
                </div>

                <hr className="dashed" />
                <div className="thanks">********* THANK YOU! *********</div>
                <div className="barcode"></div>
            </div>

            {/* --- Footer Actions --- */}
            <div className="actions">
                <label className="print-check">
                    <input
                        type="checkbox"
                        checked={shouldPrint}
                        onChange={(e) => setShouldPrint(e.target.checked)}
                    />
                    <span>Print Receipt</span>
                </label>

                <button className="btn btn-primary" onClick={handleCreateSale}>
                    Create Sale
                </button>
            </div>

            {/* --- Overlays (Print & Success) --- */}
            {printing && (
                <PrintingAnimation
                    setCartItems={setCartItems}
                    setStatus={setStatus}
                    setprintig={setPrinting}
                />
            )}

            {successAnimation && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderRadius: '8px'
                }}>
                    <SuccessAnimation 
                        setCartItems={setCartItems}
                        setStatus={setStatus} 
                    />
                </div>
            )}

            
        </div>
        
    );
}