import { categories } from '../data/Products';
import './CategoryList.css'
import { NavBar } from './NavBar'
import { Bell, CircleDot, Search, Filter } from 'lucide-react';

export function CategoryList() {
    return (
        <>
            <NavBar head={'Category List'} text={'Manage your Categorys'} button={'Create New Category'} />
            <div class="CategoryList">
                <div className="header-row" style={{ marginBottom: '15px' }}>
                    <h3>Category List</h3>
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
                {/* <h2 class="header-title">Explore more</h2> */}

                <div class="grid">
                    {categories.map((item, index) =>
                        <div class="card" key={index}>
                            <div className="head">
                                <p>{item.id}</p>
                                <i class="bi bi-eye-fill"></i>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '24px'

                            }}>
                                <div class="info">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div class="icon-box blue">{item.icon}</div>
                                        <h3>{item.name}</h3>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* </div> */}

                </div>
            </div>
        </>
    )
}