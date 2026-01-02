import React, { useEffect, useRef, useState } from 'react';
import { categories } from '../data/Products';
import './CategoryList.css'
import { NavBar } from './NavBar'
import Chart from 'chart.js/auto';
import { Bell, CircleDot, Search, Filter, Eye } from 'lucide-react';

export function CategoryList() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    const doughnutChartRef = useRef(null);
    const polarChartRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        // Ensure refs are available
        if (!doughnutChartRef.current || !polarChartRef.current) return;

        const doughnutCtx = doughnutChartRef.current.getContext('2d');
        const polarCtx = polarChartRef.current.getContext('2d');

        // 1. Doughnut Chart
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Beverages', 'Snacks', 'Main Course', 'Desserts'],
                datasets: [{
                    data: [300, 50, 100, 80],
                    backgroundColor: ['#52ad0a', '#2c7a7b', '#718096', '#f6ad55'],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '70%'
            }
        });

        // 2. Pie Chart
        const polarChart = new Chart(polarCtx, {
            type: 'pie',
            data: {
                labels: ['Operations', 'Marketing', 'Sales', 'Finance', 'HR', 'IT'],
                datasets: [{
                    data: [21.2, 11.2, 18.2, 12.1, 13.1, 24.2],
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#f97316', '#ef4444', '#2dd4bf', '#4ade80'],
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

        // Cleanup: Essential to prevent "Canvas is already in use" error
        return () => {
            doughnutChart.destroy();
            polarChart.destroy();
        };
    }, []);

    return (
        <>
            <NavBar head={'Category List'} text={'Manage your Categorys'} button={'Create New Category'} />

            <div className="CategoryList">

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




                {isDesktop ? (
                    /* --- TABLE VIEW (Desktop > 1024px) --- */
                    <div className="table-container">
                        <div className="header-row" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category  List</h3>
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
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Icon</th>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><div className="table-icon-box blue">{item.icon}</div></td>
                                        <td><strong>{item.name}</strong></td>
                                        <td>{item.description}</td>
                                        <td><Eye size={18} style={{ cursor: 'pointer', color: 'gray' }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* --- CARD VIEW (Mobile/Tablet < 1024px) --- */
                    <div className="grid">
                        {categories.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="head">
                                    <p>{item.id}</p>
                                    <Eye size={16} color="gray" />
                                </div>
                                <div className="card-body">
                                    <div className="info">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="icon-box blue">{item.icon}</div>
                                            <h3>{item.name}</h3>
                                        </div>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}