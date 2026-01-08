import './ProductList.css';
import { Search, Filter } from 'lucide-react';
import { NavBar } from './NavBar.jsx';
import { useState, useMemo } from 'react';
import { DeletionModal } from './DeletionModal.jsx';
import { phoneProducts } from '../data/Products.js';

export function ProductList({ SetTab }) {
    const [IsDelete, setDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // --- LOGIC: Filter and Calculations ---

    // 1. Filter products based on search input
    const filteredProducts = useMemo(() => {
        return phoneProducts.filter(item =>
            item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.productID.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // 2. Calculate Stats
    const totalProductCount = phoneProducts.length;
    const totalStockQuantity = phoneProducts.reduce((acc, item) => acc + item.totalStock, 0);
    const totalPotentialProfit = phoneProducts.reduce((acc, item) => acc + (item.profit * item.totalStock), 0);

    // 3. Graph Logic: Circular Progress
    const stockCapacity = 500;
    const stockPercentage = Math.min(Math.round((totalStockQuantity / stockCapacity) * 100), 100);
    
    // Circumference for r=16 is ~100. This maps percentage 1:1 to dasharray
    const strokeValue = stockPercentage;
    const remainingValue = 100 - stockPercentage;

    // 4. Sort Top Products (using spread to avoid mutating original array)
    const topProducts = [...phoneProducts]
        .sort((a, b) => b.totalStock - a.totalStock)
        .slice(0, 2);

    function addproduct() {
        SetTab('productAdd');
    }

    return (
        <>
            <NavBar
                head={'Product overview'}
                text={'Manage your Product'}
                button={'Create New Product'}
                buttonAction={addproduct}
            />

            <main className="Product-List">
                <div className="container">

                    {/* --- STATS CARDS SECTION --- */}
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        
                        {/* Card 1: Stock Info (Circular Graph) */}
                        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <p className="title" style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '10px' }}>Stock Info</p>
                            <div className="progress-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p className="stat" style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>
                                        {stockPercentage}%
                                    </p>
                                    <span className="sub-text" style={{ color: '#718096', fontSize: '0.85rem' }}>
                                        {totalStockQuantity} / {stockCapacity} Units
                                    </span>
                                </div>

                                <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                                        <circle
                                            cx="18" cy="18" r="16"
                                            fill="transparent"
                                            stroke="#e2e8f0"
                                            strokeWidth="3"
                                        />
                                        <circle
                                            cx="18" cy="18" r="16"
                                            fill="transparent"
                                            stroke="#52ad0a"
                                            strokeWidth="3"
                                            strokeDasharray={`${strokeValue} ${remainingValue}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dasharray 0.5s ease' }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Total Products (Line Graph) */}
                        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p className="title" style={{ color: '#718096', fontSize: '0.9rem' }}>Total Products</p>
                                    <p className="stat" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalProductCount}</p>
                                </div>
                                <span className="badge" style={{ background: '#f0fff4', color: '#2f855a', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', height: 'fit-content' }}>+Live</span>
                            </div>
                            <div className="chart-area" style={{ marginTop: '10px' }}>
                                <svg viewBox="0 0 200 60" style={{ width: '100%', height: '50px' }}>
                                    <path d="M0,50 Q25,20 50,45 T100,20 T150,40 T200,10" fill="none" stroke="#52ad0a" strokeWidth="3" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: Potential Profit (Bar Graph) */}
                        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p className="title" style={{ color: '#718096', fontSize: '0.9rem' }}>Potential Profit</p>
                                    <p className="stat" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{(totalPotentialProfit / 1000).toFixed(1)}K</p>
                                </div>
                                <span className="badge" style={{ background: '#fff5f5', color: '#c53030', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', height: 'fit-content' }}>Inventory</span>
                            </div>
                            <div className="chart-area" style={{ marginTop: '15px' }}>
                                <div className="bar-container" style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                                    {[40, 80, 50, 90, 30, 70, 100, 60].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%`, width: '100%', background: '#52ad0a', borderRadius: '2px', opacity: 0.8 }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Top Inventory */}
                        <div className="card" style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <p className="title" style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '10px' }}>Top Inventory</p>
                            <div className="product-list">
                                {topProducts.map((prod) => (
                                    <div key={prod.productID} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <img src={prod.image} alt="" style={{ width: '35px', height: '35px', borderRadius: '6px', objectFit: 'cover' }} />
                                        <div className="product-info">
                                            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>{prod.productName}</p>
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#718096' }}>{prod.totalStock} units</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- TABLE SECTION --- */}
                    <div className="table-responsive" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <div className="header-row" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Product List</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#718096' }} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or ID..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ padding: '8px 12px 8px 32px', borderRadius: '6px', border: '1px solid #e2e8f0', width: '220px' }}
                                    />
                                </div>
                                <button style={{ padding: '8px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Filter size={14} /> Filter
                                </button>
                            </div>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #edf2f7', color: '#718096', fontSize: '0.85rem' }}>
                                    <th style={{ padding: '12px', width: '40px' }}><input type="checkbox" /></th>
                                    <th style={{ padding: '12px' }}>PRO ID</th>
                                    <th style={{ padding: '12px' }}>Product Name</th>
                                    <th style={{ padding: '12px' }}>Category</th>
                                    <th style={{ padding: '12px' }}>Qty</th>
                                    <th style={{ padding: '12px' }}>Purchase</th>
                                    <th style={{ padding: '12px' }}>Selling</th>
                                    <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((item) => (
                                    <tr key={item.productID} style={{ borderBottom: '1px solid #f7fafc', fontSize: '0.9rem' }}>
                                        <td style={{ padding: '12px' }}><input type="checkbox" /></td>
                                        <td style={{ padding: '12px', fontWeight: '600', color: '#4a5568' }}>{item.productID}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={item.image} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                                                <span style={{ fontWeight: '500' }}>{item.productName}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px' }}><span style={{ background: '#edf2f7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>{item.category}</span></td>
                                        <td style={{ padding: '12px' }}>{item.totalStock}</td>
                                        <td style={{ padding: '12px' }}>₹{item.purchaseRate.toLocaleString()}</td>
                                        <td style={{ padding: '12px' }}>₹{item.sellingRate.toLocaleString()}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#718096' }}>
                                                <i className="bi bi-eye-fill" style={{ cursor: 'pointer' }} onClick={() => SetTab('ProductView')}></i>
                                                <i className="bi bi-pencil-fill" style={{ cursor: 'pointer' }}></i>
                                                <i className="fa-solid fa-trash" style={{ cursor: 'pointer', color: '#e53e3e' }} onClick={() => setDelete(true)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredProducts.length === 0 && (
                            <p style={{ textAlign: 'center', padding: '30px', color: '#a0aec0' }}>No products found matching "{searchQuery}"</p>
                        )}
                    </div>
                </div>

                {IsDelete && <DeletionModal setDelete={setDelete} />}
            </main>
        </>
    );
}