import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FoodCard from './components/FoodCard';
import Cart from './components/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const DUMMY_MENU = [
  { id: 1, name: 'Classic Burger', price: 149, category: 'Main Course', description: 'Juicy chicken patty with fresh lettuce and secret sauce.', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500' },
  { id: 2, name: 'Paneer Tikka Pizza', price: 299, category: 'Fast Food', description: 'Hand-tossed pizza with spiced paneer and extra cheese.', rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500' },
  { id: 3, name: 'Avocado Salad', price: 199, category: 'Healthy', description: 'Fresh avocados, cherry tomatoes, and honey lemon dressing.', rating: 4.2, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500' },
  { id: 4, name: 'Chocolate Brownie', price: 120, category: 'Dessert', description: 'Warm fudgy brownie with a scoop of vanilla ice cream.', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1624353335563-0949d0340794?auto=format&fit=crop&q=80&w=500' },
  { id: 5, name: 'Iced Americano', price: 89, category: 'Beverages', description: 'Smooth espresso shot over ice with a hint of caramel.', rating: 4.3, imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4bb1dba5?auto=format&fit=crop&q=80&w=500' },
  { id: 6, name: 'Spicy Ramen', price: 250, category: 'Main Course', description: 'Hot and fiery noodles with soft boiled egg and vegetables.', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=500' },
];

const CATEGORIES = ['All', 'Main Course', 'Fast Food', 'Healthy', 'Dessert', 'Beverages'];

const Home = () => {
  const [menu, setMenu] = useState(DUMMY_MENU);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart, updateQuantity, cart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/menu')
      .then(res => {
        if (res.data.length > 0) setMenu(res.data);
      })
      .catch(err => console.log('Using dummy menu as backend is not reachable'));
  }, []);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/payment');
  };

  const filteredMenu = menu.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto py-16 px-4 md:px-8">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gray-100 pb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-secondary tracking-tight mb-3">
                {searchTerm ? `Results for "${searchTerm}"` : 'Handpicked for you'}
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                Fresh, fast, and delicious food delivered from our campus kitchen to your desk.
              </p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${selectedCategory === cat
                    ? 'bg-secondary text-white shadow-xl scale-105'
                    : 'bg-white text-gray-500 border-2 border-gray-100 hover:border-primary/20 hover:text-primary'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredMenu.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {filteredMenu.map(item => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}

          </motion.div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-4xl">
              🥺
            </div>
            <h3 className="text-2xl font-black text-secondary mb-2">No matching items</h3>
            <p className="text-gray-500 font-medium">Try another search or browse categories.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
              className="mt-8 btn-premium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>




      <footer className="bg-secondary py-20 mt-32">
        <div className="container text-center text-gray-400">
          <div className="text-4xl font-black text-white mb-6">HungryHub.</div>
          <p className="max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            The ultimate food delivery solution for our campus. Fresh, fast, and always delicious.
          </p>
          <div className="flex justify-center gap-10 mb-10 text-white font-bold text-lg">
            <span className="cursor-pointer hover:text-primary transition-colors">Twitter</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Linkedin</span>
          </div>
          <p className="text-sm border-t border-white/10 pt-10 font-medium">
            © 2026 HungryHub Campus Eats. Built with React and Spring Boot.
          </p>
        </div>
      </footer>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
    </>
  );
};

import Admin from './pages/Admin';
import Orders from './pages/Orders';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<Admin />} />

            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
