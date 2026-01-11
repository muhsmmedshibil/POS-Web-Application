import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import { SideBar } from '../Components/SideBar';
import { Dashboard } from '../Components/Dashboard';
import { SaleSection } from '../Components/SaleSection';
import { ProductList } from '../Components/ProductList';
import { CategoryList } from '../Components/CategoryList';
import { ProductAddForm } from '../Components/ProductAddForm';
import { ProductView } from '../Components/ProductView';
import './Home.css';

function Home() {
  const [tab, SetTab] = useState('sale');
  const [selectProduct,setSelectProduct] =useState({})
  const navigate = useNavigate();

  function getSelectProduct (product){
    setSelectProduct(product)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    localStorage.removeItem('userEmail');
    navigate('/'); // Back to login
  };

  return (
    <section className='mainSection'>
      {/* Pass handleLogout to SideBar if you want a logout button there */}
      <SideBar tab={tab} SetTab={SetTab} onLogout={handleLogout} />


      {tab === 'dashboard' && <Dashboard SetTab={SetTab} />}
      {tab === 'sale' && <SaleSection tab={tab}/>}
      {tab === 'productList' && <ProductList getSelectProduct = {getSelectProduct} SetTab={SetTab} />}
      {tab === 'categoryList' && <CategoryList SetTab={SetTab} />}
      {tab === 'productAdd' && <ProductAddForm SetTab={SetTab} />}
      {tab === 'ProductView' && <ProductView productData={selectProduct} SetTab={SetTab} />}
      {tab === 'settings' && <div>Settings Content Here</div>}

    </section>
  );
}

export default Home;