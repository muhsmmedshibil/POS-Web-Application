import './ProductList.css';
import { foodItems, phoneProducts } from '../data/Products.js';

import { Search, Filter } from 'lucide-react';

import { NavBar } from './NavBar.jsx';

export function ProductList() {




    return (
        <>
            <NavBar head={'Product overview'} text={'Manage your Product'} button={'Create New Product'} />
            <main className="Product-List">
                <div className="container">

                    <div className="stats-grid">
                        <div className="card">
                            <p className="title">Stock Info</p>
                            <div className="progress-container">
                                <div>
                                    <p className="stat"> 60% </p>
                                    {/* <p className="stat"> $5.65K</p> */}

                                    <span className="sub-text">40% of Stack out</span>
                                </div>
                                <svg viewBox="0 0 36 36" className="circle-svg">
                                    <circle className="c-bg" cx="18" cy="18" r="16" />
                                    <circle className="c-fill" cx="18" cy="18" r="16" />
                                </svg>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex-between">
                                <div><p className="title">Total Product</p><p className="stat">12.65%</p></div>
                                <span className="badge pos">+3.6%</span>
                            </div>
                            <div className="chart-area">
                                <svg viewBox="0 0 200 60" className="line-svg">
                                    <path d="M0,50 Q25,20 50,45 T100,20 T150,40 T200,10" fill="none" stroke="#52ad0a" strokeWidth="3" />
                                </svg>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex-between">
                                <div><p className="title">Monthly Earning</p><p className="stat">32.4K</p></div>
                                <span className="badge neg">-2.4%</span>
                            </div>
                            <div className="chart-area">
                                <div className="bar-container">
                                    <div className="bar" style={{ height: '40%' }}></div>
                                    <div className="bar" style={{ height: '80%' }}></div>
                                    <div className="bar" style={{ height: '50%' }}></div>
                                    <div className="bar" style={{ height: '90%' }}></div>
                                    <div className="bar" style={{ height: '30%' }}></div>
                                    <div className="bar" style={{ height: '70%' }}></div>
                                    <div className="bar" style={{ height: '100%' }}></div>
                                    <div className="bar" style={{ height: '60%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <p className="title">Top Products</p>
                            <div className="product-list">
                                <div className="product-item">
                                    <div className="product-img" style={{ background: '#E3F2FD' }}></div>
                                    <div className="product-info">
                                        <p className="product-name">Horizon UI PRO</p>
                                        <p className="product-sales">342 Sales</p>
                                    </div>
                                    <div className="status-dot"></div>
                                </div>
                                <div className="product-item">
                                    <div className="product-img" style={{ background: '#E3F2FD' }}></div>
                                    <div className="product-info">
                                        <p className="product-name">Horizon UI PRO</p>
                                        <p className="product-sales">342 Sales</p>
                                    </div>
                                    <div className="status-dot"></div>
                                </div>

                                {/* ... Repeat for other items if necessary ... */}
                            </div>
                        </div>
                    </div>

                    {/* <div className="charts-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div className="chart-box" style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                            <h4>Category Distribution</h4>
                            <div style={{ height: '250px' }}><canvas ref={doughnutChartRef} /></div>
                        </div>
                        <div className="chart-box" style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <h4 style={{ marginBottom: '15px' }}>Department Status</h4>
                            <div style={{ height: '250px' }}><canvas ref={polarChartRef} /></div>
                        </div>
                    </div> */}

                    <div className="table-responsive">
                        <div className="header-row" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product List</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#718096' }} />
                                    <input type="text" placeholder="Search..." style={{ padding: '8px 12px 8px 32px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                                <button className="btn-secondary" style={{ padding: '8px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Filter size={14} /> Filter
                                </button>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><input type="checkbox" /></th>
                                    <th>PRO ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Unit</th>
                                    <th>Qty</th>
                                    <th>Purchase Rate</th>
                                    <th>Selling Rate</th>
                                    <th>Discond</th>
                                    <th>profit</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phoneProducts.map((item) => (
                                    <tr key={item.productID} style={{ borderTop: '1px solid #f7fafc' }}>
                                        <td><input type="checkbox" /></td>
                                        <td>{item.productID}</td>
                                        <td>
                                            <div className="product-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <img src={item.image} alt={item.productName} style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
                                                {item.productName}
                                            </div>
                                        </td>
                                        <td>{item.category}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹ {item.purchaseRate}</td>
                                        <td>₹ {item.sellingRate}</td>
                                        
                                        <td>{item.Discond} %</td>
                                        <td>₹ {item.profit}</td>
                                        <td>
                                            <div className="actions" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                <i class="bi bi-eye-fill"></i>
                                                <i className="bi bi-pencil-fill"></i>
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#718096' }}>
                        <div>2026 © DreamsPOS. All Rights Reserved</div>
                        <div>Designed & Developed By <span style={{ color: '#52ad0a' }}>Dreams</span></div>
                    </div>
                </div>
            </main>
        </>
    );
}