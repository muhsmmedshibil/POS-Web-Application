import { useEffect, useState } from 'react'
import './BillingProduct.css'

export function BillingProduct({  baseRate , setProductIdx,index,item,setStatus,EditProductForBill }) {
    
    // const baseRate = item.sellingRate
    useEffect(()=>{
        setProductIdx(index)
        // setBaseRate(item.sellingRate)
    })
    return (
        <div className="bill-item" onClick={()=>(setStatus('billingProductEdit'),EditProductForBill(item))}>
            <img
                src={item.image}
                alt="item"
            />

            <div className="bill-info">
                <h5 className="bill-title">{item.productName}</h5>
                <div style={{display:'flex',alignItems:'center' , gap:'5px'}}>
                    {/* <div className="bill-qty">
                    <button className="qty-btn">-</button>
                    <span className="qty-count">1</span>
                    <button className="qty-btn qty-plus">+</button>
                </div> */}
                <p className="bill-price">₹{baseRate}</p>
                </div>

            </div>

            <div className="bill-qty">
                {/* <button className="qty-btn">-</button> */}
                <span className="qty-count">{item.quantity}</span>
                {/* <button className="qty-btn qty-plus">+</button> */}
            </div>

            <div className="item-price">
                <p className='price'>₹ {item.sellingRate}</p>
            </div>

            {/*  */}
        </div>
    )
}
