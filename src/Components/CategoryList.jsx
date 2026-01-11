import React, { useState } from 'react';
import { categories } from '../data/Products';
import './CategoryList.css';
import { NavBar } from './NavBar';
import Chart from 'chart.js/auto';
import { Search, Filter, Eye, Pencil, Trash2 } from 'lucide-react';
import CategoryAdd from './CategoryAdd';
import { DeletionModal } from './DeletionModal';

export function CategoryList({ SetTab }) {
    const [isDesktop] = useState(window.innerWidth > 1024);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter categories based on search
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [addForm, setAddform] = useState(false)
    function addCategory() {
        setAddform(true)
    }

    const [IsDelete, setDelete] = useState(false);

    return (
        <>
            <NavBar head={'Category List'} text={'Manage your Categories'} button={'Create New Category'} buttonAction={addCategory} />

            <div className="CategoryList">
                {/* Responsive Chart Row */}


                <div className="content-container">
                    <div className="header-row">
                        <h3>Category List</h3>
                        <div className="action-group">
                            <div className="search-wrapper">
                                <Search size={16} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn-filter">
                                <Filter size={14} /> Filter
                            </button>
                            <button className="btn-primary" onClick={()=>addCategory()}>
                                    <i class="bi bi-plus-lg"></i>
                                    <span>Add Category</span>
                                </button>
                        </div>
                    </div>

                    {isDesktop ? (
                        /* --- DESKTOP TABLE --- */
                        <div className="table-responsive">
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
                                    {filteredCategories.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td><div className="table-icon-box blue">{item.icon}</div></td>
                                            <td><strong>{item.name}</strong></td>
                                            <td>{item.description}</td>
                                            <td >
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#718096' }}>
                                                    <i className="bi bi-eye-fill" style={{ cursor: 'pointer', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }} onClick={() => (SetTab('ProductView'))}></i>
                                                    <i className="bi bi-pencil-fill" style={{ cursor: 'pointer', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }}></i>
                                                    <i className="fa-solid fa-trash" style={{ cursor: 'pointer', color: '#e53e3e', padding: ' 6px 8px', background: '#f1f5f9', borderRadius: '5px' }} onClick={() => setDelete(true)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* --- MOBILE CARDS --- */
                        <div className="grid">
                            {filteredCategories.map((item) => (
                                <div className="card" key={item.id}>
                                    <div className="head">
                                        <p>ID: {item.id}</p>
                                        <Eye size={16} color="gray" />
                                    </div>
                                    <div className="card-body">
                                        <div className="info">
                                            <div className="card-title-row">
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
            </div>
            {addForm == true ? <CategoryAdd setAddform={setAddform} /> : ''}
            {IsDelete == true ? <DeletionModal setDelete={setDelete} /> : ''}
        </>
    );
}