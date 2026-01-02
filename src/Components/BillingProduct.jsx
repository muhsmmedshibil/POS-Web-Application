import './BillingProduct.css'

export function BillingProduct({ item,setStatus,EditProductForBill }) {
    return (
        <div className="bill-item" onClick={()=>(setStatus('billingProductEdit'),EditProductForBill(item))}>
            <img
                src={item.image}
                alt="item"
            />

            <div className="bill-info">
                <h5 className="bill-title">{item.name}</h5>
                <div style={{display:'flex',alignItems:'center' , gap:'5px'}}>
                    {/* <div className="bill-qty">
                    <button className="qty-btn">-</button>
                    <span className="qty-count">1</span>
                    <button className="qty-btn qty-plus">+</button>
                </div> */}
                <p className="bill-price">₹{item.price}</p>
                </div>

            </div>

            <div className="bill-qty">
                {/* <button className="qty-btn">-</button> */}
                <span className="qty-count">1</span>
                {/* <button className="qty-btn qty-plus">+</button> */}
            </div>

            <div className="item-price">
                <p className='price'>₹ {item.price}</p>
            </div>

            {/*  */}
        </div>
    )
}
