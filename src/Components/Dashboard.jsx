import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Search, Filter } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);

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
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false, // Allows the chart to follow container height
            plugins: { legend: { display: false } }
        };

        const lineChart = new Chart(lineChartRef.current, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: [85, 95, 88, 110, 92, 105, 125],
                    borderColor: '#52ad0a',
                    fill: true,
                    backgroundColor: 'rgba(82, 173, 10, 0.05)',
                    tension: 0.4
                }]
            },
            options: commonOptions
        });

        const barChart = new Chart(barChartRef.current, {
            type: 'bar',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{
                    data: [45, 65, 55, 120, 75, 50, 60],
                    backgroundColor: (ctx) => ctx.index === 3 ? '#52ad0a' : '#cbd5e0',
                    borderRadius: 8
                }]
            },
            options: commonOptions
        });

        return () => {
            lineChart.destroy();
            barChart.destroy();
        };
    }, []);

    return (
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
                    {/* {[
                        { label: 'Profit / Loss', val: '$2,427', up: '5.54%' },
                        { label: 'Avg Sale Value', val: '$227.28', up: '3.12%' },
                        { label: 'Total Sales', val: '2,427', up: '12%' },
                        { label: 'Lifetime Profit', val: '$2,427', up: '5.54%' }
                    ].map((s, i) => (
                        <div key={i} className="stat-card">
                            <small>{s.label}</small>
                            <h3>{s.val}</h3>
                            <span style={{ color: 'green' }}>↑ {s.up}</span>
                        </div>
                    ))} */}

                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">Profit / Loss (M)
                            </span>
                            <span class="dots">•••</span>
                        </div>
                        <div class="card-body">
                            <div>
                                <div class="trend trend-up">↗ +3.4%</div>
                                <h2 class="value">$239.94</h2>
                               
                            </div>
                            <div class="chart-container">
                                <svg class="svg-chart">
                                    <rect class="bar" x="0" y="15" width="4" height="25" />
                                    <rect class="bar" x="10" y="25" width="4" height="15" />
                                    <rect class="bar" x="20" y="5" width="4" height="35" />
                                    <rect class="bar" x="30" y="20" width="4" height="20" />
                                    <rect class="bar" x="40" y="0" width="4" height="40" />
                                    <rect class="bar" x="50" y="12" width="4" height="28" />
                                    <rect class="bar" x="60" y="8" width="4" height="32" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">Total Sales</span>
                            <span class="dots">•••</span>
                        </div>
                        <div class="card-body">
                            <div>
                                <div class="trend trend-down">↘ -0.4%</div>
                                 <h2 class="value">178,080</h2>
                            </div>
                            <div class="chart-container">
                                <svg class="svg-chart" viewBox="0 0 100 50">
                                    <path class="line" d="M0,40 Q20,45 40,20 T80,10 T100,35" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">Customers</span>
                            <span class="dots">•••</span>
                        </div>
                        <div class="card-body">
                            <div>
                                <div class="trend trend-up">↗ +12%</div>
                                <h2 class="value">1,240</h2>
                            </div>
                            <div class="chart-container">
                                <svg class="svg-chart" viewBox="0 0 100 50">
                                    <path class="line" d="M0,45 L20,35 L40,40 L60,15 L80,25 L100,5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">Lifetime Profit / Loss </span>
                            <span class="dots">•••</span>
                        </div>
                        <div class="card-body">
                            <div>
                                <div class="trend trend-up">↗ +1.2%</div>
                                <h2 class="value">4.82%</h2>
                            </div>
                            <div class="chart-container">
                                <svg class="svg-chart" viewBox="0 0 100 50">
                                    <path class="line" d="M0,40 H20 V20 H40 V30 H60 V10 H80 V25 H100" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="charts-row">
                    <div className="chart-box">
                        <h4>Sale Analytics</h4>
                        <canvas ref={lineChartRef} />
                    </div>
                    <div className="chart-box">
                        <h4>Weekly Performance</h4>
                        <canvas ref={barChartRef} />
                    </div>
                </div>

                <div className="table-section">
                    <div className="header-row">
                        <h3>Orders List</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#718096' }} />
                                <input type="text" placeholder="Search..." style={{ padding: '8px 12px 8px 32px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>
                            <button style={{ padding: '8px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Filter size={14} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
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
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>ID: {order.id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.product}</td>
                                        <td>{order.amount}</td>
                                        <td>
                                            <span className="status-pill" style={{ background: order.color, color: order.textColor, padding: '4px 8px', borderRadius: '4px' }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <span style={{ cursor: 'pointer' }}>👁️</span>
                                                <span style={{ cursor: 'pointer' }}>✏️</span>
                                                <span style={{ cursor: 'pointer', color: 'red' }}>🗑️</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};