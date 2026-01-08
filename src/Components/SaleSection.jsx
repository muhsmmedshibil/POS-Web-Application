import "./SaleSection.css";
import { useState } from 'react';
import { categories, phoneProducts } from '../data/Products.js';
import { SaleProductList } from "./SaleProductList.jsx";
import { BillingPanel } from "./Blling-panel.jsx";

export function SaleSection({ tab }) {
  const [cartItems, setCartItems] = useState([]);
  const [satatus, setStatus] = useState('bill')

  // States for filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  function cartProduct(product) {
    const existing = cartItems.find(item => item.productID === product.productID);
    if (existing) {
      const updatedCart = cartItems.map(item =>
        item.productID === product.productID ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // --- FILTER LOGIC ---
  const filteredProducts = phoneProducts.filter((product) => {
    // 1. Check Category
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

    // 2. Check Search Query (matches name or category)
    const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());



  return (
    <main className="main-content">
      <header className="header">
        <div className="header-text">
          <div>
            <h1>Create New Sale</h1>
            <p id="current-date"> on {formattedDate}</p>
          </div>
          <div className="user-profile">
            <img src="https://i.pravatar.cc/150?u=lauren" alt="User" />
            <div className="user-info">
              <h4>Lauren Smith</h4>
              <p>Store Manager</p>
            </div>
          </div>
        </div>

        {/* Working Search Bar */}
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Category or Item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="secentmain">
        <section>
          <h2 className="section-header">Choose Category</h2>
          <div className="category-scroll">

            {/* "All" Tab */}
            <div
              className={`cat-card ${selectedCategory === "All" ? 'active' : ''}`}
              onClick={() => setSelectedCategory("All")}
            >
              <span className="Icon">🛍️</span>
              <span className="name">All Items</span>
            </div>

            {categories.map((category, index) => (
              <div
                key={category.id || index}
                className={`cat-card ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="Icon">{category.icon}</span>
                <span className="name">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-header">
            Menu Items
          </h2>

          <div className="menu-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <SaleProductList
                satatus={satatus}
                  key={item.productID}
                  item={item}
                  cartProduct={cartProduct}
                />
              ))
            ) : (
              <div className="no-products-container">
                <div className="no-products-content">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <p>No products found matching <strong>"{searchQuery || selectedCategory}"</strong></p>

                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <BillingPanel satatus={satatus} setStatus={setStatus} setCartItems={setCartItems} cartItems={cartItems} />
    </main>
  );
}