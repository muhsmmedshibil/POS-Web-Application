
import { useState } from 'react';
import { SaleSection } from '../Components/SaleSection';
import { SideBar } from '../Components/SideBar';
import './Home.css';
import { ProductList } from '../Components/ProductList';
import { CategoryList } from '../Components/CategoryList';
import { Dashboard } from '../Components/Dashboard';
import { ProductAddForm } from '../Components/ProductAddForm';
import { ProductView } from '../Components/ProductView';
import CategoryAdd from '../Components/CategoryAdd';


function Home() {
  const [tab, SetTab] = useState('sale')



  return (
    <section className='mainSection'>
      <SideBar tab={tab} SetTab={SetTab} />
      {tab == 'dashboard' ? <Dashboard /> :
        tab == 'sale' ? <SaleSection /> :
          tab == 'productList' ? <ProductList SetTab={SetTab} /> :
            tab == 'categoryList' ? <CategoryList /> :
              tab == 'settings' ? '' :
                tab == 'productAdd' ? <ProductAddForm SetTab={SetTab}/> :
                  tab == 'ProductView' ? <ProductView SetTab={SetTab}/> :''}
    </section>
  );
}

export default Home;
