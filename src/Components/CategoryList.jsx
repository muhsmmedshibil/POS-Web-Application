import React, { useEffect, useRef, useState } from 'react';
import { categories } from '../data/Products';
import './CategoryList.css';
import { NavBar } from './NavBar';
import Chart from 'chart.js/auto';
import { Search, Filter, Eye, Pencil, Trash2 } from 'lucide-react';
import CategoryAdd from './CategoryAdd';
import { DeletionModal } from './DeletionModal';

export function CategoryList() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
    const [searchTerm, setSearchTerm] = useState('');

    const doughnutChartRef = useRef(null);
    const polarChartRef = useRef(null);

    // Filter categories based on search
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [addForm, setAddform] = useState(false)
    function addCategory(){
        setAddform(true)
    }

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
                                            <td className="actions">
                                                <i class="bi bi-eye-fill action-btn" onClick={() => ''}></i>
                                                <button className="action-btn edit"><Pencil size={14} /></button>
                                                <button className="action-btn delete"><Trash2 size={14} /></button>
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
             {addForm == true ? <CategoryAdd setAddform={setAddform}  /> : ''}
        </>
    );
}