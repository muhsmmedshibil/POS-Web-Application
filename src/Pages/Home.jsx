
import { useState } from 'react';
import { SaleSection } from '../Components/SaleSection';
import { SideBar } from '../Components/SideBar';
import './Home.css';
import { ProductList } from '../Components/ProductList';
import { CategoryList } from '../Components/CategoryList';
import {Dashboard} from '../Components/Dashboard';


function Home() {
  const [tab, SetTab] = useState('sale')



  return (
    <section className='mainSection'>
      <SideBar tab={tab} SetTab={SetTab} />
      {tab == 'dashboard' ? <Dashboard/> :
        tab == 'sale' ? <SaleSection /> :
          tab == 'productList' ? <ProductList /> :
            tab == 'categoryList' ? <CategoryList /> :
              tab == 'settings' ? '' : ''}
    </section>
  );
}

export default Home;
