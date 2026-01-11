import React from 'react';
import './ProductView.css';
import { NavBar } from './NavBar';

export const ProductView = ({ productData, SetTab }) => {
    const data = productData || {
        productID: 'SMP1',
        productName: "Galaxy S23",
        image: "https://igalaxy.nl/cdn/shop/files/519nePwnpIL.jpg?v=1706038274&width=445",
        category: "Smartphone",
        purchaseRate: 52000,
        sellingRate: 62000,
        profit: 10000,
        unit: "pcs",
        quantity: 1,
        totalStock: 25,
        Discond: 0,
        createdDate: "2025-01-01",
    };

    // FIX 1: Define the stock status logic
    const isLowStock = data.totalStock > 0 && data.totalStock < 5;
    const stockStatusClass = data.totalStock > 0 ? (isLowStock ? 'low' : 'in') : 'low';

    const formatCurrency = (num) => `₹${num.toLocaleString()}`;

    return (
        <>
            <NavBar
                head={'Product Details'}
                text={`Product ID: ${data.productID}`}
                button ={'Edit Product'}
                iconAction={() => SetTab('productList')}
            />

            <div className="product-view-container">
                <div className="view-card">
                    {/* Image Section */}
                    <div className="image-col">
                        <div className="image-box">
                            <img src={data.image} alt={data.productName} className="product-img" />
                        </div>



                        {/* Added Description Section */}
                        <div className="product-description-container">
                            <h4 className="description-title">Product Description</h4>
                            <p className="description-text">
                                {data.description || "No description available for this product."}
                            </p>
                        </div>
                    </div>

                    {/* Data Section */}
                    <div className="details-col">
                        <table className="details-table">
                            <tbody>
                                <tr className="table-section-head"><td colSpan="2">General Information</td></tr>
                                <tr><td>Product Name</td><td>{data.productName}</td></tr>
                                <tr><td>Category</td><td>{data.category}</td></tr>
                                <tr><td>Total Stock</td> <td>
                                    <div className="stock-badge-container">
                                        <div className={`stock-status ${stockStatusClass}`}>
                                            {data.totalStock > 0 ? `In Stock: ${data.totalStock}` : 'Out of Stock'}
                                        </div>
                                    </div>
                                </td></tr>
                                <tr><td>Created Date</td><td>{data.createdDate}</td></tr>

                                <tr className="table-section-head"><td colSpan="2">Inventory & Stock</td></tr>
                                <tr><td>Total Stock</td><td>{data.totalStock} {data.unit}</td></tr>
                                <tr><td>Minimum Quantity</td><td>{data.quantity} {data.unit}</td></tr>
                                <tr><td>Unit Type</td><td>{data.unit}</td></tr>

                                <tr className="table-section-head"><td colSpan="2">Financial Details</td></tr>
                                <tr><td>Purchase Rate</td><td>{formatCurrency(data.purchaseRate)}</td></tr>
                                <tr><td>Selling Rate</td><td>{formatCurrency(data.sellingRate)}</td></tr>
                                <tr><td>Profit Margin</td><td className="profit-text">{formatCurrency(data.profit)}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};