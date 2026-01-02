import { useState, useEffect } from 'react';
import { categories } from '../data/Products';
import './CategoryList.css'
import { NavBar } from './NavBar'
import { Bell, CircleDot, Search, Filter, Eye } from 'lucide-react';

export function CategoryList() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <NavBar head={'Category List'} text={'Manage your Categorys'} button={'Create New Category'} />
            <div className="CategoryList">
                <div className="header-row">
                    <h3>Category List</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} className="search-icon" />
                            <input type="text" placeholder="Search..." className="search-input" />
                        </div>
                        <button className="btn-filter">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                {isDesktop ? (
                    /* --- TABLE VIEW (Desktop > 1024px) --- */
                    <div className="table-container">
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
                                        <td><Eye size={18} style={{cursor: 'pointer', color: 'gray'}} /></td>
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