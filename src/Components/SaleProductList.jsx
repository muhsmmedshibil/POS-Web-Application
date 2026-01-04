import './SaleProductList.css'
import clickSound from '../../public/click.wav'
import { useRef } from 'react'

export function SaleProductList({ item, cartProduct }) {
    const audioRef = useRef(null)

    const handleClick = () => {
        audioRef.current.play(),
            cartProduct(item)
    }

    return (
        <>
            <div className="product-card" onClick={handleClick}>
                <img src={item.image} alt={item.productName} />
                <h3>{item.productName}</h3>
                <p className="price">₹{item.sellingRate.toFixed(2)}</p>
                <small>{item.totalStock} items available</small>
            </div>

            <audio ref={audioRef} src={clickSound} />
        </>
    )
}
