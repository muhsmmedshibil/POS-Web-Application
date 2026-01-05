import React from 'react';
import './ProductView.css';
import { NavBar } from './NavBar';

export const ProductView = ({ productData  ,SetTab}) => {
    // Default data if no prop is provided
    const data = productData || {
        name: "Macbook pro",
        category: "Computers",
        subCategory: "None",
        brand: "None",
        unit: "Piece",
        sku: "PT0001",
        minQty: 5,
        quantity: 50,
        tax: "0.00 %",
        discountType: "Percentage",
        price: "1500.00",
        status: "Active",
        description: "Designed for professionals, it offers smooth multitasking and high-end graphics capability.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop",
        fileName: "macbookpro.jpg",
        fileSize: "581kb"
    };

    function iconAction(){
        SetTab('productList')
    }

    return (
        <>
            <NavBar head={'Product Details'} text={'Full details of a product'} button={'Edit Product'} iconAction ={iconAction}/>
            <div className="product-view-container">
                

                <div className="view-card">
                    <div className="image-col">
                        <div className="image-box">
                            {/* <button className="gear-btn" aria-label="Settings">⚙</button> */}
                            {/* <button className="nav-arrow arrow-left" onClick={() => console.log("Prev")}>❮</button> */}
                            <img src={data.image} alt={data.name} className="product-img" />

                        </div>
                        <div className="img-meta">
                            <div className="filename">{data.fileName}</div>
                            <div className="filesize">{data.fileSize}</div>
                        </div>
                    </div>
                    {/* Left Section: Barcode & Table */}
                    <div className="details-col">
                        {/* <div className="barcode-container">
            <img 
              src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${data.sku}&scale=1&height=10`} 
              alt="Barcode" 
            />
          </div> */}

                        <table className="details-table">
                            <tbody>
                                <tr><td>Product</td><td>{data.name}</td></tr>
                                <tr><td>Category</td><td>{data.category}</td></tr>
                                <tr><td>Sub Category</td><td>{data.subCategory}</td></tr>
                                <tr><td>Brand</td><td>{data.brand}</td></tr>
                                <tr><td>Unit</td><td>{data.unit}</td></tr>
                                <tr><td>SKU</td><td>{data.sku}</td></tr>
                                <tr><td>Minimum Qty</td><td>{data.minQty}</td></tr>
                                <tr><td>Quantity</td><td>{data.quantity}</td></tr>
                                <tr><td>Tax</td><td>{data.tax}</td></tr>
                                <tr><td>Discount Type</td><td>{data.discountType}</td></tr>
                                <tr><td>Price</td><td>{data.price}</td></tr>
                                <tr>
                                    <td>Status</td>
                                    <td style={{ color: data.status === 'Active' ? '#28c76f' : '#ff4d4f' }}>
                                        {data.status}
                                    </td>
                                </tr>
                                <tr><td>Description</td><td>{data.description}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Section: Image Viewer */}

                </div>


            </div>
        </>
    );
};