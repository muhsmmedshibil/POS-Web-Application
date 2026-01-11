import React, { useEffect, useRef, useMemo, useState } from 'react';
import Chart from 'chart.js/auto';
import { Search, Filter } from 'lucide-react';
import { NavBar } from './NavBar';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

export const Dashboard = ({ SetTab }) => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const chartInstances = useRef({ line: null, bar: null });
    const [activeTab, setActiveTab] = useState('Month');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const orders = useMemo(() => [
        { id: '706682356', date: '24 May', product: 'Lego Star War...', amount: '$1,020', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682357', date: '25 May', product: 'Nike Air Max', amount: '$210', status: 'PENDING', color: '#fffaf0', textColor: '#b7791f' },
        { id: '706682358', date: '26 May', product: 'Sony WH-1000XM5', amount: '$350', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682359', date: '26 May', product: 'iPhone 15 Case', amount: '$45', status: 'CANCELED', color: '#fff5f5', textColor: '#c53030' },
        { id: '706682360', date: '27 May', product: 'Mechanical Keyboard', amount: '$180', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682361', date: '28 May', product: 'Gaming Mouse', amount: '$80', status: 'ON DELIVERY', color: '#ebf8ff', textColor: '#2b6cb0' },
        { id: '706682362', date: '29 May', product: 'MacBook Pro 14', amount: '$1,999', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682363', date: '30 May', product: 'iPad Air', amount: '$599', status: 'PENDING', color: '#fffaf0', textColor: '#b7791f' },
        { id: '706682364', date: '01 Jun', product: 'AirPods Pro', amount: '$249', status: 'DELIVERED', color: '#e6fffa', textColor: '#2c7a7b' },
        { id: '706682365', date: '02 Jun', product: 'Dell UltraSharp', amount: '$450', status: 'ON DELIVERY', color: '#ebf8ff', textColor: '#2b6cb0' },
    ], []);

    const stats = useMemo(() => {
        const rawAmounts = orders.map(o => parseFloat(o.amount.replace(/[$,]/g, '')) || 0);
        const totalValue = rawAmounts.reduce((a, b) => a + b, 0);

        return {
            total: totalValue.toLocaleString(),
            count: orders.length,
            profit: (totalValue * 0.12).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            rawValues: rawAmounts,
            lineLabels: orders.map(o => o.date),
            lineValues: rawAmounts,
            // CHANGED: Monthly labels and data
            monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthlyValues: [12000, 15000, 11000, 18000, 22000, 25000, 21000, 24000, 29000, 32000, 35000, 40000]
        };
    }, [orders]);

    const chartDataValues = [40, 35, 55, 45, 70, 65, 85, 75, 95, 100];
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            fill: true,
            label: 'Revenue',
            data: chartDataValues,
            borderColor: '#4318FF',
            tension: 0.4,
            backgroundColor: 'rgba(67, 24, 255, 0.1)',
        }],
    };

    useEffect(() => {
        // Cleanup existing instances
        if (chartInstances.current.line) chartInstances.current.line.destroy();
        if (chartInstances.current.bar) chartInstances.current.bar.destroy();

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            }
        };

        // Initialize Line Chart (Daily Sales)
        if (lineChartRef.current) {
            chartInstances.current.line = new Chart(lineChartRef.current, {
                type: 'line',
                data: {
                    labels: stats.lineLabels,
                    datasets: [{
                        data: stats.lineValues,
                        borderColor: '#4318FF',
                        backgroundColor: 'rgba(82, 173, 10, 0.05)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: commonOptions
            });
        }

        // CHANGED: Initialize Monthly Bar Chart
        if (barChartRef.current) {
            chartInstances.current.bar = new Chart(barChartRef.current, {
                type: 'bar',
                data: {
                    labels: stats.monthlyLabels,
                    datasets: [{
                        label: 'Revenue',
                        data: stats.monthlyValues,
                        backgroundColor: '#4318FF',
                        borderRadius: 4,
                        barThickness: 'flex' // Auto-adjust bar width for 12 months
                    }]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        ...commonOptions.scales,
                        y: {
                            ...commonOptions.scales.y,
                            ticks: { callback: (value) => '$' + (value / 1000) + 'k' }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstances.current.line) chartInstances.current.line.destroy();
            if (chartInstances.current.bar) chartInstances.current.bar.destroy();
        };
    }, [stats]);

    return (
        <>
            <NavBar
                head={'Sales overview'}
                text={'Manage your Sales'}
                button={'Create New Sale'}
                buttonAction={() => SetTab('sale')}
            />

            <div className="dashboard">
                <div className="main-container">

                    {/* Stats Cards Row */}
                    <div className="stats-grid">
                        <div className="card">
                            <div className="card-header">
                                <span className="card-title">Profit / Loss (M)</span>
                                <span className="dots">•••</span>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="trend trend-up">↗ +3.4%</div>
                                    <h2 className="value">${stats.profit}</h2>
                                </div>
                                <div className="chart-container">
                                    <svg className="svg-chart" viewBox="0 0 80 40">
                                        {stats.rawValues.slice(0, 8).map((v, i) => (
                                            <rect key={i} className="bar" x={i * 10} y={Math.max(0, 40 - (v / 50))} width="4" height={v / 50} fill="#4318FF" />
                                        ))}
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span className="card-title">Total Sales</span>
                                <span className="dots">•••</span>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="trend trend-down">↘ -0.4%</div>
                                    <h2 className="value">${stats.total}</h2>
                                </div>
                                <div className="chart-container">
                                    <svg className="svg-chart" viewBox="0 0 100 50">
                                        <path className="line" fill="none" stroke="#4318FF" strokeWidth="2"
                                            d={`M ${stats.rawValues.map((v, i) => `${(i / (stats.count - 1)) * 100},${Math.max(0, 50 - (v / 40))}`).join(' L ')}`} />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span className="card-title">Customers</span>
                                <span className="dots">•••</span>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="trend trend-up">↗ +12%</div>
                                    <h2 className="value">{stats.count}</h2>
                                </div>
                                <div className="chart-container">
                                    <svg className="svg-chart" viewBox="0 0 100 50">
                                        <path className="line" fill="none" stroke="#4318FF" strokeWidth="2" strokeDasharray="4"
                                            d="M0,45 L20,35 L40,40 L60,15 L80,25 L100,5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span className="card-title">Lifetime Profit %</span>
                                <span className="dots">•••</span>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="trend trend-up">↗ +1.2%</div>
                                    <h2 className="value">12.0%</h2>
                                </div>
                                <div className="chart-container">
                                    <svg className="svg-chart" viewBox="0 0 100 50">
                                        <path className="line" fill="none" stroke="#4318FF" strokeWidth="2" d="M0,40 H20 V20 H40 V30 H60 V10 H80 V25 H100" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Row */}
                    <div className="charts-row">
                        <section className="card chart-section">
                            <div className="chart-header">
                                <h3 className="card-title">Analytics</h3>
                                <div className="btn-group">
                                    {['Day', 'Week', 'Month'].map(tab => (
                                        <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-wrapper">
                                <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </section>

                        <div className="chart-box">
                            {/* CHANGED: Label to Monthly Performance */}
                            <h4>Monthly Performance</h4>
                            <div style={{ height: '280px', position: 'relative' }}>
                                <canvas ref={barChartRef} />
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="table-section">
                        <div className="header-row">
                            <h3>Recent Orders</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#718096' }} />
                                    <input type="text" placeholder="Search..." style={{ padding: '8px 12px 8px 32px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                </div>
                                <button className="filter-btn" style={{ padding: '8px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                                        <th>PRODUCTS</th>
                                        <th>AMOUNT</th>
                                        <th>DISCOUNT</th>
                                        <th>PROFIT</th>
                                        <th>PAYMENT</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td style={{ fontWeight: '600' }}>#{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.product}</td>
                                            <td>{order.amount}</td>
                                            <td>10%</td>
                                            <td>200</td>
                                            <td>
                                                <span className="status-pill" style={{ background: order.color, color: order.textColor, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#718096' }}>
                                                    <i className="bi bi-eye-fill" style={{ cursor: 'pointer', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }} onClick={() => (SetTab('ProductView'), getSelectProduct(item))}></i>
                                                    <i className="bi bi-pencil-fill" style={{ cursor: 'pointer', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }}></i>
                                                    <i className="fa-solid fa-trash" style={{ cursor: 'pointer', color: '#e53e3e', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }} onClick={() => setDelete(true)}></i>
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
        </>
    );
};

// full code only set dainamic datas on charts 