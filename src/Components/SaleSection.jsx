import "./SaleSection.css";
import { useState } from 'react';
import food, { categories } from '../data/Products.js';
import { SaleProductList } from "./SaleProductList.jsx";
import { BillingPanel } from "./Blling-panel.jsx";
export function SaleSection() {
  const [cartItems, setCartItems] = useState([])
  function cartProduct(product) {
    setCartItems([...cartItems, product])
    console.log(cartItems)
  }
  return (
    <main className="main-content">
      <header class="header">
        <div class="header-text">
          <div>
            <h1>Create  New Sale</h1>
            <p id="current-date"> on Tuesday, 02 Feb 2024</p>
          </div>
          <div class="user-profile">
            <img src="https://i.pravatar.cc/150?u=lauren" alt="User" />
            <div class="user-info">
              <h4>Lauren Smith</h4>
              <p>Store Manager</p>
            </div>
            {/* <i class="fa-solid fa-chevron-down" ></i> */}
          </div>
        </div>
        <div class="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search by Category or Item" />
        </div>
      </header>

      <div className="secentmain">
        <section >
          <h2 className="section-header">Choose Category</h2>
          <div className="category-scroll">
            {categories.map((category, index) => (
              <div
                key={category.id || index}
                className={`cat-card ${category.isActive ? 'active' : ''}`}
              >
                <i
                  className={category.icon || "fa-solid fa-bowl-rice"}
                  style={{ color: category.color || "#d35400" }}
                >{category.icon}</i>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section >
          <h2 className="section-header">Menu Items</h2>

          <div className="menu-grid">
            {food.map((item) => (

              <SaleProductList item={item} cartProduct={cartProduct} />
            ))}
          </div>
        </section>
      </div>
      <BillingPanel setCartItems={setCartItems} cartItems={cartItems} />
    </main>
  );
}
