import './BillTemplate.css';
import React, { useState } from 'react';
import { PrintingAnimation } from './printingAnimation';
import CategoryAdd from './CategoryAdd';

export function BillTemplate({ setCartItems, setStatus, cartItems }) {
    const [printing, setPrinting] = useState(false);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.sellingRate,
        0
    );

    return (
        <div className="receipt">
            {/* Header */}
            <div className="cart-header">
                <div>
                    <h2>Current Bills</h2>
                    <span>Table 4 • Customer: Walk-In</span>
                </div>
                <div className="row">
                    <i className="fa-solid fa-print"  onClick={() => setPrinting(true)}></i>
                    {/* <i className="bi bi-pencil-fill"></i> */}
                    {/* <i className="fa-solid fa-trash"></i> */}
                </div>
            </div>

            {/* Bill Section */}
            <div className="billsection">
                <div className="stars">*****************************</div>
                <h1>RECEIPT</h1>
                <div className="stars">*****************************</div>

                <div className="flex">
                    <span>Date:</span>
                    <span>{new Date().toLocaleString()}</span>
                    <span>Time:</span>
                    <span>{new Date().toLocaleString()}</span>
                </div>

                <hr className="dashed" />

                {/* Item List */}
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
                                <span>{(item.sellingRate).toFixed(0)}</span>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '10px' }}>
                            No items added
                        </p>
                    )}
                </div>

                <hr className="double" />

                {/* Totals */}
                <div className="totals">
                    <div className="flex ">
                        <span>TOTAL </span>
                        <span>{totalAmount.toFixed(0)}</span>
                    </div>
                    <div className="flex">
                        <span>Tax(10)</span>
                        <span>0.00</span>
                    </div>
                    <div className="flex">
                        <span>CASH</span>
                        <span>{totalAmount.toFixed(0)}</span>
                    </div>
                     <div className="flex">
                        <span>Discound</span>
                        <span>0.00</span>
                    </div>
                    <div className="flex bold">
                        <span>NET PAYABLE</span>
                        <span>0.00</span>
                    </div>
                   

                </div>

                <hr className="dashed" />
                
                <div className="thanks">********* THANK YOU! *********</div>
                <div className="barcode"></div>
            </div>

            {/* Actions */}
            <div className="actions">
                <label className="print-check">
                    <input type="checkbox"  onChange={(e)=>{console.log(e.target.value)}}/>
                    <span>Print Receipt</span>
                </label>

                <button
                    className="btn btn-primary"
                    onClick={() => setPrinting(true)}
                >
                    Create Sale
                </button>
            </div>

            {printing && (
                <PrintingAnimation
                    setCartItems={setCartItems}
                    setStatus={setStatus}
                    setprintig={setPrinting}
                />
            )}

            {/* <CategoryAdd/> */}
        </div>
    );
}
