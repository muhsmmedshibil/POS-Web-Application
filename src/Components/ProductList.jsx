import './ProductList.css';
import { foodItems } from '../data/Products.js';
import React, { useEffect, useRef } from 'react';
import { Bell, CircleDot, Search, Filter } from 'lucide-react';
import Chart from 'chart.js/auto';
import { NavBar } from './NavBar.jsx';

export function ProductList() {
    // 1. Corrected Refs
    const doughnutChartRef = useRef(null);
    const polarChartRef = useRef(null);

    useEffect(() => {
        const doughnutCtx = doughnutChartRef.current.getContext('2d');
        const polarCtx = polarChartRef.current.getContext('2d');

        // 2. Doughnut Chart: Category Distribution
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Beverages', 'Snacks', 'Main Course', 'Desserts'],
                datasets: [{
                    data: [300, 50, 100, 80],
                    backgroundColor: [
                        '#52ad0a', // Primary Green
                        '#2c7a7b', // Teal
                        '#718096', // Gray
                        '#f6ad55'  // Orange
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                },
                cutout: '70%'
            }
        });

        // 3. Polar/Pie Chart: Department Status
        const polarChart = new Chart(polarCtx, {
            type: 'pie',
            data: {
                labels: ['Operations', 'Marketing', 'Sales', 'Finance', 'HR', 'IT'],
                datasets: [{
                    data: [21.2, 11.2, 18.2, 12.1, 13.1, 24.2],
                    backgroundColor: [
                        '#8b5cf6', // Purple
                        '#3b82f6', // Blue
                        '#f97316', // Orange
                        '#ef4444', // Red
                        '#2dd4bf', // Teal
                        '#4ade80'  // Green
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { boxWidth: 12, font: { size: 10 } }
                    }
                }
            }
        });

        // Cleanup to prevent memory leaks and "Canvas already in use" errors
        return () => {
            doughnutChart.destroy();
            polarChart.destroy();
        };
    }, []);

    return (
        <>
        <NavBar head={'Product overview'} text={'Manage your Product'} button={'Create New Product'}/>
            <main className="Product-List">
                <div className="container">
                    <div className="header-row">
                        <div className="header-title">
                            <h1>Product List</h1>
                            <p>Manage your products</p>
                        </div>
                        <button className="btn-primary">Create New Order</button>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <small>Total Product</small>
                            <h3>$2,427</h3>
                            <span style={{ color: 'green' }}>↑ 5.54%</span>
                        </div>
                        <div className="stat-card">
                            <small>Avg Order Value</small>
                            <h3>$227.28</h3>
                            <span style={{ color: 'green' }}>↑ 3.12%</span>
                        </div>
                        <div className="stat-card">
                            <small>Total Orders</small>
                            <h3>2,427</h3>
                            <span style={{ color: 'green' }}>↑ 12%</span>
                        </div>
                        <div className="stat-card">
                            <small>Lifetime Value</small>
                            <h3>$2,427</h3>
                            <span style={{ color: 'green' }}>↑ 5.54%</span>
                        </div>
                    </div>

                    <div className="charts-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div className="chart-box" style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
                            <h4>Category Distribution</h4>
                            <div style={{ height: '250px' }}><canvas ref={doughnutChartRef} /></div>
                        </div>
                        <div className="chart-box" style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <h4 style={{ marginBottom: '15px' }}>Department Status</h4>
                            <div style={{ height: '250px' }}><canvas ref={polarChartRef} /></div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <div className="header-row" style={{ marginBottom: '15px' }}>
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
                                    <th>SKU</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Unit</th>
                                    <th>Qty</th>
                                    <th>Created By</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodItems.map((item) => (
                                    <tr key={item.sku} style={{ borderTop: '1px solid #f7fafc' }}>
                                        <td><input type="checkbox" /></td>
                                        <td>{item.sku}</td>
                                        <td>
                                            <div className="product-info" style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={item.image} alt={item.name}  />
                                                {item.name}
                                            </div>
                                        </td>
                                        <td>{item.cat}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.price}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.user}</td>
                                        <td>
                                            <div className="actions" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                <i className="fa-solid fa-eye" style={{ cursor: 'pointer', color: '#718096' }}></i>
                                                <i className="fa-solid fa-pen-to-square" style={{ cursor: 'pointer', color: '#718096' }}></i>
                                                <i className="fa-solid fa-trash" style={{ cursor: 'pointer', color: '#ef4444' }}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#718096' }}>
                        <div>2026 © DreamsPOS. All Right Reserved</div>
                        <div>Designed & Developed By <span style={{ color: '#52ad0a' }}>Dreams</span></div>
                    </div>
                </div>
            </main>
        </>
    );
}