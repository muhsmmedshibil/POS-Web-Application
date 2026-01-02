import React, { useState } from 'react';
import Select from 'react-select';
import * as FA6 from 'react-icons/fa6';

// 1. Updated Keywords for your 3 Categories
const PRODUCT_KEYWORDS = [
  'Mobile', 'Tablet', 'Watch', 'Laptop', 'Gem', 'Gift', 'Cart', 'Bag', 
  'Tag', 'Box', 'Truck', 'Camera', 'Headphones', 'CreditCard', 'Wallet'
];

const FOOD_KEYWORDS = [
  'Apple', 'Carrot', 'Lemon', 'Leaf', 'Pepper', 'Bread', 'Burger', 
  'Pizza', 'Bowl', 'Mug', 'Glass', 'IceCream', 'Cake', 'Egg', 'Fish', 'Seedling'
];

const TOY_KEYWORDS = [
  'Gamepad', 'Puzzle', 'Robot', 'Ghost', 'Chess', 'Dice', 'CarSide', 
  'PlaneUp', 'Horse', 'Shapes', 'Train', 'Rocket'
];

// 2. Filter and Map the icons
const iconOptions = Object.keys(FA6)
  .map((key) => {
    const cleanName = key.replace('Fa', '');
    let category = null;

    if (FOOD_KEYWORDS.some(word => cleanName.includes(word))) category = 'Fruits & Vegetables';
    else if (PRODUCT_KEYWORDS.some(word => cleanName.includes(word))) category = 'Products & Jewelry';
    else if (TOY_KEYWORDS.some(word => cleanName.includes(word))) category = 'Toys & Games';

    return {
      value: key,
      label: cleanName,
      icon: FA6[key],
      category: category
    };
  })
  .filter(option => option.category !== null)
  .sort((a, b) => a.label.localeCompare(b.label));

// 3. Group the options
const groupedOptions = [
  {
    label: '🧸 Toys & Games',
    options: iconOptions.filter(opt => opt.category === 'Toys & Games')
  },
  {
    label: '📦 Products & Jewelry',
    options: iconOptions.filter(opt => opt.category === 'Products & Jewelry')
  },
  {
    label: '🍎 Fruits & Vegetables',
    options: iconOptions.filter(opt => opt.category === 'Fruits & Vegetables')
  }
];

const CategoryAdd = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const formatOptionLabel = ({ label, icon: Icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Icon style={{ minWidth: '18px' }} />
      <span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );

  return (
    <div style={{ width: '400px', margin: '40px auto', fontFamily: 'system-ui, sans-serif' , position:'fixed',top:'0'}}>
      <label style={{ fontWeight: '600', display: 'block', marginBottom: '10px', color: '#374151' }}>
        Select Category Icon:
      </label>

      <Select
        options={groupedOptions}
        getOptionLabel={formatOptionLabel}
        onChange={(option) => setSelectedIcon(option)}
        placeholder="Search (e.g. Robot, Apple, Watch...)"
        isClearable
        styles={{
          groupHeading: (base) => ({
            ...base,
            backgroundColor: '#f3f4f6',
            color: '#1f2937',
            fontWeight: 'bold',
            padding: '8px 12px',
          }),
          control: (base) => ({
            ...base,
            borderRadius: '8px',
            borderColor: '#d1d5db'
          })
        }}
      />

      {selectedIcon && (
        <div style={{ 
          marginTop: '20px', 
          padding: '24px', 
          textAlign: 'center', 
          border: '2px solid #eff6ff', 
          borderRadius: '16px',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '15px', 
            backgroundColor: '#fff', 
            borderRadius: '50%', 
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
          }}>
            <selectedIcon.icon size={40} color="#2563eb" />
          </div>
          <h4 style={{ marginTop: '15px', marginBottom: '4px', color: '#1e293b' }}>{selectedIcon.label}</h4>
          <span style={{ 
            fontSize: '11px', 
            backgroundColor: '#dbeafe', 
            color: '#1e40af', 
            padding: '2px 8px', 
            borderRadius: '12px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}>
            {selectedIcon.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryAdd;