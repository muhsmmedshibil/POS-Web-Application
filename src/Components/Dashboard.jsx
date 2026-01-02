import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Bell, CircleDot, Search, Filter } from 'lucide-react';
import './Dashboard.css';
import { NavBar } from './NavBar';

export const Dashboard = () => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);

    // 1. Array of 10 Orders
    const orders = [
        { id: '706682356', date: '24 May, 2023', product: 'Lego Star War...', amount: '$123', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682357', date: '25 May, 2023', product: 'Nike Air Max', amount: '$210', status: 'PENDING', color: '#fffaf0', textColor: '#b7791f' },
        { id: '706682358', date: '26 May, 2023', product: 'Sony WH-1000XM5', amount: '$350', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682359', date: '26 May, 2023', product: 'iPhone 15 Case', amount: '$45', status: 'CANCELED', color: '#fff5f5', textColor: '#c53030' },
        { id: '706682360', date: '27 May, 2023', product: 'Mechanical Keyboard', amount: '$180', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682361', date: '28 May, 2023', product: 'Gaming Mouse', amount: '$80', status: 'ON DELIVERY', color: '#ebf8ff', textColor: '#2b6cb0' },
        { id: '706682362', date: '29 May, 2023', product: 'MacBook Pro 14', amount: '$1,999', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682363', date: '30 May, 2023', product: 'iPad Air', amount: '$599', status: 'PENDING', color: '#fffaf0', textColor: '#b7791f' },
        { id: '706682364', date: '01 Jun, 2023', product: 'AirPods Pro', amount: '$249', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682365', date: '02 Jun, 2023', product: 'Dell UltraSharp', amount: '$450', status: 'ON DELIVERY', color: '#ebf8ff', textColor: '#2b6cb0' },
    ];

    useEffect(() => {
        const lineCtx = lineChartRef.current.getContext('2d');
        const barCtx = barChartRef.current.getContext('2d');

        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: [85, 95, 88, 110, 92, 105, 125],
                    borderColor: '#52ad0a',
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    tension: 0.4
                }]
            },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{
                    data: [45, 65, 55, 120, 75, 50, 60],
                    backgroundColor: (ctx) => ctx.index === 3 ? '#52ad0a' : '#cbd5e0',
                    borderRadius: 8
                }]
            },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        return () => {
            lineChart.destroy();
            barChart.destroy();
        };
    }, []);

    return (
        <>
            <NavBar head={'CategoryList'} text={'Manage your Categorys'} button={'Create New Sale'} />
            <div className="dashboard">
                <div className="main-container">
                    <div className="header-row">
                        <div className="header-title">
                            <h1>Sales overview</h1>
                            <p>Manage your products</p>
                        </div>
                        <button className="btn-primary">Create New Sale</button>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <small>Profit / Loss</small>
                            <h3>$2,427</h3>
                            <span style={{ color: 'green' }}>↑ 5.54%</span>
                        </div>
                        <div className="stat-card">
                            <small>Avg Sale Value</small>
                            <h3>$227.28</h3>
                            <span style={{ color: 'green' }}>↑ 3.12%</span>
                        </div>
                        <div className="stat-card">
                            <small>Total Sales</small>
                            <h3>2,427</h3>
                            <span style={{ color: 'green' }}>↑ 12%</span>
                        </div>
                        <div className="stat-card">
                            <small>Lifetime Profit / Loss</small>
                            <h3>$2,427</h3>
                            <span style={{ color: 'green' }}>↑ 5.54%</span>
                        </div>
                    </div>

                    <div className="charts-row">
                        <div className="chart-box">
                            <h4>Sale Analytics</h4>
                            <div style={{ height: '200px' }}><canvas ref={lineChartRef} /></div>
                        </div>
                        <div className="chart-box">
                            <h4>Weekly Performance</h4>
                            <div style={{ height: '200px' }}><canvas ref={barChartRef} /></div>
                        </div>
                    </div>

                    <div className="table-section">
                        <div className="header-row" style={{ marginBottom: '15px' }}>
                            <h3>Orders List</h3>
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
                        <table>
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>ORDER DATE</th>
                                    <th>PRODUCTS DETAILS</th>
                                    <th>AMOUNT</th>
                                    <th>PAYMENT</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 2. Mapping through the orders array */}
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>ID: {order.id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.product}</td>
                                        <td>{order.amount}</td>
                                        <td>
                                            <span className="status-pill" style={{ background: order.color, color: order.textColor }}>
                                                {order.status}
                                            </span>
                                        </td>
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
                </div>
            </div>
        </>
    );
};

// export default Dashboard;