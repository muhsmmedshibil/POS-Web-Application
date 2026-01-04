import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductAddForm.css';
import { NavBar } from './NavBar';
import { categories } from '../data/Products';

export function ProductAddForm() {
    const initialState = {
        name: '',
        id: '',
        unit: '',
        qty: 0,
        purchaseRate: '',
        sellingRate: '',
        description: '',
        category: '', 
        image: null
    };

    const [productData, setProductData] = useState(initialState);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ID validation states
    const [isIdUnique, setIsIdUnique] = useState(null);
    const [checkingId, setCheckingId] = useState(false);

    // Mock unique ID check
    const checkIdUniqueness = async (sku) => {
        if (!sku) {
            setIsIdUnique(null);
            return;
        }

        setCheckingId(true);
        try {
            const existingSKUs = ['SKU-100', 'SKU-200', 'JACKET-01'];
            
            setTimeout(() => {
                const isUnique = !existingSKUs.includes(sku.toUpperCase());
                setIsIdUnique(isUnique);
                setCheckingId(false);
                
                if (!isUnique) {
                    setErrors(prev => ({ ...prev, id: "This ID already exists in inventory" }));
                }
            }, 600);
        } catch (err) {
            setCheckingId(false);
        }
    };

    // Debounce for ID check
    useEffect(() => {
        const timer = setTimeout(() => {
            if (productData.id) {
                checkIdUniqueness(productData.id);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [productData.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
        if (name === 'id') setIsIdUnique(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: "File size too large (Max 2MB)" }));
                return;
            }
            setPreview(URL.createObjectURL(file));
            setProductData(prev => ({ ...prev, image: file }));
            setErrors(prev => ({ ...prev, image: null }));
        }
    };

    const removeImage = () => {
        setPreview(null);
        setProductData(prev => ({ ...prev, image: null }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!productData.name.trim()) tempErrors.name = "Product name is required";
        if (!productData.id) tempErrors.id = "SKU/ID is required";
        if (isIdUnique === false) tempErrors.id = "Please use a unique ID";
        if (!productData.purchaseRate || productData.purchaseRate <= 0) tempErrors.purchaseRate = "Invalid rate";
        if (!productData.sellingRate || productData.sellingRate <= 0) tempErrors.sellingRate = "Invalid rate";
        if (!productData.description.trim()) tempErrors.description = "Description is required";
        if (!productData.image) tempErrors.image = "Product image is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // 1. Create FormData object
        const formData = new FormData();

        // 2. Append all fields including category
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        // 3. LOG FORM DATA TO CONSOLE
        // Note: console.log(formData) won't show contents. We must iterate.
        console.log("--- Submitting Product Data ---");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // Adjust the URL to your actual endpoint
            await axios.post('https://api.example.com/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            alert("Product added successfully!");
            setProductData(initialState);
            setPreview(null);
            setIsIdUnique(null);
        } catch (error) {
            console.error("API Error:", error);
            alert("Error adding product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ProductAddcontainer">
            <NavBar head={'Add New Product'} text={'Create New  Product for very simple'} button={' Add Product'} buttonAction={handleSubmit} />

            <header className="header-section">
                <h2><i className="fas fa-box"></i> New Inventory Item</h2>
                <div className="btn-group">
                    <button className="btn-draft" type="button" disabled={isSubmitting}>
                        <i className="far fa-save"></i> Save Draft
                    </button>
                    <button className="btn-add" onClick={handleSubmit} disabled={isSubmitting || checkingId}>
                        {isSubmitting ? "Processing..." : <><i className="fas fa-check"></i> Add Product</>}
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">
                <div className="left-col">
                    <section className="card-p">
                        <h3>General Information</h3>
                        <div className="pricing-grid">
                            <div className="form-group">
                                <label>Product Name*</label>
                                <input 
                                    type="text" name="name" 
                                    className={errors.name ? "error-border" : ""}
                                    value={productData.name} 
                                    placeholder='Winter Jacket' onChange={handleInputChange} 
                                />
                                {errors.name && <span className="err-msg">{errors.name}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label>Product ID / SKU*</label>
                                <div className="input-icon-wrapper">
                                    <input 
                                        type="text" name="id" 
                                        className={`${errors.id ? "error-border" : ""} ${isIdUnique ? "success-border" : ""}`}
                                        value={productData.id} 
                                        placeholder='SKU-001' onChange={handleInputChange} 
                                    />
                                    <div className="validation-loader">
                                        {checkingId && <i className="fas fa-circle-notch fa-spin"></i>}
                                        {isIdUnique === true && !checkingId && <i className="fas fa-check-circle tick-icon"></i>}
                                        {isIdUnique === false && !checkingId && <i className="fas fa-times-circle cross-icon"></i>}
                                    </div>
                                </div>
                                {errors.id && <span className="err-msg">{errors.id}</span>}
                            </div>
                        </div>

                        <div className="pricing-grid">
                            <div className="form-group">
                                <label>Unit</label>
                                <select name="unit" value={productData.unit} onChange={handleInputChange}>
                                    <option value="Pcs">Pieces (Pcs)</option>
                                    <option value="Kg">Kilograms (Kg)</option>
                                    <option value="Box">Box</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Initial Quantity</label>
                                <input type="number" name="qty" value={productData.qty} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Purchase Rate ($)*</label>
                                <input 
                                    type="number" name="purchaseRate" 
                                    className={errors.purchaseRate ? "error-border" : ""}
                                    value={productData.purchaseRate} placeholder='0.00' onChange={handleInputChange} 
                                />
                                {errors.purchaseRate && <span className="err-msg">{errors.purchaseRate}</span>}
                            </div>
                            <div className="form-group">
                                <label>Selling Rate ($)*</label>
                                <input 
                                    type="number" name="sellingRate" 
                                    className={errors.sellingRate ? "error-border" : ""}
                                    value={productData.sellingRate} placeholder='0.00' onChange={handleInputChange} 
                                />
                                {errors.sellingRate && <span className="err-msg">{errors.sellingRate}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Product Description*</label>
                            <textarea 
                                name="description" 
                                className={errors.description ? "error-border" : ""}
                                value={productData.description} 
                                placeholder="Describe the material..." 
                                onChange={handleInputChange}
                            ></textarea>
                            {errors.description && <span className="err-msg">{errors.description}</span>}
                        </div>
                    </section>
                </div>

                <div className="right-col">
                    <section className="card-p">
                        <h3>Media</h3>
                        <div className={`upload-container ${errors.image ? "error-border-dash" : ""}`}>
                            {!preview ? (
                                <div className="drop-zone">
                                    <input type="file" onChange={handleFileChange} className="file-input" accept="image/*" />
                                    <label className="drop-zone-label">
                                        <i className="fas fa-cloud-upload-alt upload-icon"></i>
                                        <p>Click to <span>Browse</span></p>
                                    </label>
                                </div>
                            ) : (
                                <div className="preview-container">
                                    <img src={preview} alt="Preview" className="img-preview" />
                                    <button className="btn-remove" type="button" onClick={removeImage}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                        {errors.image && <span className="err-msg">{errors.image}</span>}
                    </section>

                    <section className="card-p">
                        <h3>Classification</h3>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={productData.category} onChange={handleInputChange}>
                               {categories.map((item, index)=>(
                                 <option key={index} value={item.name}>{item.name}</option>
                               ))}
                            </select>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}