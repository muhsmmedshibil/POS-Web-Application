import './SaleProductList.css'
import clickSound from '../../public/click.wav'
import { useRef, useState, useEffect } from 'react'

export function SaleProductList({ satatus, item, cartProduct }) {
    const audioRef = useRef(null);
    // State to handle popup visibility and message
    const [popup, setPopup] = useState({ show: false, message: "" });

    // Automatically hide the popup after 2 seconds
    useEffect(() => {
        if (popup.show) {
            const timer = setTimeout(() => setPopup({ show: false, message: "" }), 2000);
            return () => clearTimeout(timer);
        }
    }, [popup.show]);

    const handleClick = () => {
        if (satatus === "bill") {
            // 1. Play Sound
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }

            // 2. Execute the cart addition
            cartProduct(item);

            // 3. Show Success Popup
            setPopup({ show: true, message: `${item.productName} added to cart !` });
        } else {
            // 4. Show Warning Popup instead of alert
            setPopup({ show: true, message: "Switch to 'Cart' mode to add items." });
        }
    }

    return (
        <>
            {/* Popup UI */}
            {popup.show && (
                <div className="popup-notification">
                    {popup.message}
                </div>
            )}

            <div 
                className={`product-card ${satatus === "bill" ? "active-mode" : "readonly-mode"}`} 
                onClick={handleClick}
            >
                <img src={item.image} alt={item.productName} />
                <div className="card-details">
                    <h3>{item.productName}</h3>
                    <p className="price">₹{item.sellingRate.toFixed(2)}</p>
                    <small className="stock-info">
                        {item.totalStock > 0 ? `${item.totalStock} in stock` : "Out of stock"}
                    </small>
                </div>
                
                {/* {satatus === "bill" && <span className="add-label">+ Add to Bill</span>} */}
            </div>

            <audio ref={audioRef} src={clickSound} preload="auto" />
        </>
    )
}