import { Smartphone } from 'lucide-react';
import './SideBar.css'

export function SideBar({ SetTab, tab,onLogout }) {
  return (
    <nav className="sidebar">
      <div className="logo"  onClick={()=>SetTab('UserProfile')}>
        <Smartphone size={35} />
      </div>

      <div className="nav-items">
        
        <div
          className={`nav-item ${tab === 'sale' ? 'active' : ''}`} onClick={() => SetTab('sale')}>
          <i class="bi bi-plus-circle"></i>
          <span>New sale</span>
        </div>
        <div  className={`nav-item ${tab === 'productList' ? 'active' : ''}`} onClick={() => SetTab('productList')}>
         <i class="bi bi-box-seam-fill"></i>
          <span>Products</span>
        </div>

        <div  className={`nav-item ${tab === 'categoryList' ? 'active' : ''}`} onClick={() => SetTab('categoryList')}>
          <i class="fa-solid fa-chart-pie"></i>
          <span>Category</span>
        </div>
        {/* <div className="nav-item">
          <i class="fa-regular fa-envelope"></i>
          <span>Msgs</span>
        </div> */}
        <div
          className={`nav-item ${tab === 'dashboard' ? 'active' : ''}`} onClick={() => SetTab('dashboard')}>
          <i class="bi bi-bar-chart-fill"></i>
          {/* <i class="fa-solid fa-chart-pie"></i> */}
          <span>History</span>
        </div>
        <div className={`nav-item ${tab === 'settings' ? 'active' : ''}`} onClick={() => SetTab('settings')}>
          <i class="fa-solid fa-gear"></i>
          <span>Settings</span>
        </div>
      </div>

      <div class="logout" >
        <i class="fa-solid fa-arrow-right-from-bracket" onClick={()=>onLogout()}></i>
      </div>
    </nav>
  );
}

