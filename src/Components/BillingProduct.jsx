import { useEffect } from 'react'
import './BillingProduct.css'

export function BillingProduct({ removeItem ,setProductIdx, index, item, setStatus, EditProductForBill }) {

    const baseRate = item.sellingRate
    const totalPrice = item.sellingRate*item.quantity
    useEffect(() => {
        setProductIdx(index)

    })
    return (
        <div className="bill-item " >
            <img
                // onClick={() => (setStatus('billingProductEdit'), EditProductForBill(item))}
                src={item.image}
                alt="item"
            />

            <div className="bill-info">
                <h5 className="bill-title">{item.productName}</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    
                    <p className="bill-price">₹{baseRate}</p>
                </div>

            </div>

            <div className="bill-qty">
                {/* <button className="qty-btn">-</button> */}
                <span className="qty-count">{item.quantity}</span>
                {/* <button className="qty-btn qty-plus">+</button> */}
            </div>

            <div className="item-price">
                <div style={{ textAlign: 'center', display: 'grid', height: '40px', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-trash-fill" style={{ cursor: 'pointer', color: '#e53e3e', paddingBottom: "5px" }} onClick={()=>removeItem(index)}></i>
                    <p className='price'>₹ {totalPrice}</p>
                </div>
            </div>

            {/*  */}
        </div>
    )
}
