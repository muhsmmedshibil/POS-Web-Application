const foods = [
    {
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop",
        name: "Salmon Bowl",
        price: 32.50,
        category: "Healthy"
    },
    {
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop",
        name: "Classic Burger",
        price: 18.99,
        category: "Fast Food"
    },

    {
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
        name: "Vegan Bowl",
        price: 21.75,
        category: "Vegan"
    },
    {
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop",
        name: "Grilled Chicken",
        price: 26.50,
        category: "Protein"
    },
    {
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&auto=format&fit=crop",
        name: "Pasta Alfredo",
        price: 22.00,
        category: "Italian"
    },
    {
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop",
        name: "Avocado Toast",
        price: 14.50,
        category: "Breakfast"
    },
    {
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop",
        name: "Chocolate Cake",
        price: 12.00,
        category: "Dessert"
    },
    {
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop",
        name: "Caesar Salad",
        price: 16.25,
        category: "Salad"
    },
    {
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop",
        name: "Chocolate Cake",
        price: 12.00,
        category: "Dessert"
    },
    {
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop",
        name: "Caesar Salad",
        price: 16.25,
        category: "Salad"
    },
    {
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop",
        name: "Chocolate Cake",
        price: 12.00,
        category: "Dessert"
    },
    {
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop",
        name: "Caesar Salad",
        price: 16.25,
        category: "Salad"
    },
    {
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop",
        name: "Caesar Salad",
        price: 16.25,
        category: "Salad"
    }
];



export const foodItems = [
    { sku: 'FD001', image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&auto=format&fit=crop", name: 'Cheeseburger', cat: 'Fast Food', brand: 'Burger King', price: '$5', unit: 'Pc', qty: 120, user: 'Alice Brown' },
    { sku: 'FD002', image: "https://images.unsplash.com/photo-1603070607595-6038d1f9f028?w=400&auto=format&fit=crop", name: 'Margherita Pizza', cat: 'Pizza', brand: 'Domino\'s', price: '$12', unit: 'Pc', qty: 80, user: 'Bob Smith' },
    { sku: 'FD003', image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop", name: 'Sushi Platter', cat: 'Japanese', brand: 'Sushi House', price: '$25', unit: 'Box', qty: 50, user: 'Charlie Kim' },
    { sku: 'FD004', image: "https://images.unsplash.com/photo-1599785209707-0c49b23d2a91?w=400&auto=format&fit=crop", name: 'Caesar Salad', cat: 'Salads', brand: 'Healthy Bites', price: '$8', unit: 'Bowl', qty: 100, user: 'Dana Lee' },
    { sku: 'FD005', image: "https://images.unsplash.com/photo-1598514982202-d3b11f4cb5a4?w=400&auto=format&fit=crop", name: 'Chocolate Cake', cat: 'Desserts', brand: 'Sweet Tooth', price: '$6', unit: 'Slice', qty: 60, user: 'Eva Green' },
    { sku: 'FD006', image: "https://images.unsplash.com/photo-1564758866814-8a0144e7f0f3?w=400&auto=format&fit=crop", name: 'Grilled Chicken', cat: 'Main Course', brand: 'Grill Master', price: '$15', unit: 'Plate', qty: 75, user: 'Frank White' },
    { sku: 'FD007', image: "https://images.unsplash.com/photo-1589308078056-3336c0f3c4fc?w=400&auto=format&fit=crop", name: 'Tacos', cat: 'Mexican', brand: 'Taco Town', price: '$7', unit: 'Pc', qty: 150, user: 'Grace Hall' },
    { sku: 'FD008', image: "https://images.unsplash.com/photo-1590080875474-fc2b8a7365eb?w=400&auto=format&fit=crop", name: 'Pancakes', cat: 'Breakfast', brand: 'Morning Bliss', price: '$5', unit: 'Stack', qty: 90, user: 'Henry Scott' },
    { sku: 'FD009', image: "https://images.unsplash.com/photo-1601924582971-c6c6a8a1d9a7?w=400&auto=format&fit=crop", name: 'Spaghetti Bolognese', cat: 'Italian', brand: 'Pasta Palace', price: '$13', unit: 'Plate', qty: 70, user: 'Ivy Turner' },
    { sku: 'FD010', image: "https://images.unsplash.com/photo-1562967916-eb82221dfb22?w=400&auto=format&fit=crop", name: 'Fruit Smoothie', cat: 'Beverages', brand: 'Juicy Mix', price: '$4', unit: 'Glass', qty: 200, user: 'Jack Wilson' },
];


export default foods

export const categories = [
  {
    id: "CAT-001",
    name: "Fast Food",
    description: "Quick bites including our signature burgers, sliders, and crispy fries.",
    icon: "🍔",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-002",
    name: "Wood-Fired Pizza",
    description: "Authentic Italian-style pizzas with fresh toppings and artisanal crust.",
    icon: "🍕",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-003",
    name: "Pasta & Italian",
    description: "Classic pasta dishes featuring house-made sauces and premium ingredients.",
    icon: "🍝",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-004",
    name: "Garden Fresh",
    description: "Healthy salads and vegetarian bowls sourced from local organic farms.",
    icon: "🥗",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-005",
    name: "Sea & Grill",
    description: "Freshly caught seafood and premium cuts of meat grilled to perfection.",
    icon: "🥩",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-006",
    name: "Breakfast Bar",
    description: "Start your day with pancakes, eggs, and fresh morning pastries.",
    icon: "🥞",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-007",
    name: "Sweet Delights",
    description: "Gourmet desserts, cakes, and artisanal ice creams for your sweet tooth.",
    icon: "🍰",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-008",
    name: "Refreshments",
    description: "Craft sodas, fresh juices, and chilled beverages for every mood.",
    icon: "🥤",
    createDate: "2026-01-01"
  },
  {
    id: "CAT-009",
    name: "Caffeine Hub",
    description: "Premium roasted coffee and fine tea blends served hot or iced.",
    icon: "☕",
    createDate: "2026-01-01"
  }
];