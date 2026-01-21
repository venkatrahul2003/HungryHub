import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { Package, Plus, LogOut, LayoutDashboard, Utensils, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: '', description: '', imageUrl: '', rating: 4.5 });
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'orders') {
                const res = await api.get('/api/orders');
                setOrders(res.data);
            } else if (activeTab === 'menu') {
                const res = await api.get('/api/menu');
                setMenuItems(res.data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/menu', newItem);
            alert('Item added successfully!');
            setNewItem({ name: '', price: '', category: '', description: '', imageUrl: '', rating: 4.5 });
            fetchData();
        } catch (err) {
            alert('Failed to add item');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-secondary text-white p-6 flex flex-col gap-8">
                <div className="text-2xl font-black mb-4">Admin Hub.</div>
                <nav className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <ClipboardList size={20} /> Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <Utensils size={20} /> Menu Items
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'add' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <Plus size={20} /> Add Product
                    </button>
                </nav>
                <button onClick={() => navigate('/')} className="mt-auto flex items-center gap-3 p-4 text-gray-400 hover:text-white transition-colors">
                    <LogOut size={20} /> Exit Admin
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-secondary capitalize">{activeTab.replace('-', ' ')}</h1>
                    <div className="bg-white p-2 px-4 rounded-xl shadow-sm border border-gray-200 text-sm font-bold">
                        Welcome, Administrator
                    </div>
                </header>

                {activeTab === 'orders' && (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-widest">
                                <tr>
                                    <th className="p-6">Order ID</th>
                                    <th className="p-6">Customer</th>
                                    <th className="p-6">Amount</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6 font-bold text-gray-400">#ORD-{order.id}</td>
                                        <td className="p-6">
                                            <div className="font-extrabold text-secondary">{order.customerName}</div>
                                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">{order.paymentMethod || 'CASH'}</div>
                                        </td>
                                        <td className="p-6">
                                            <div className="font-black text-secondary">₹{order.totalAmount}</div>
                                            <div className="text-[10px] font-bold text-gray-400 font-mono tracking-tighter">{order.transactionRef || 'N/A'}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm text-gray-400">{new Date(order.orderTime).toLocaleString()}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {orders.length === 0 && <div className="p-20 text-center text-gray-400 font-bold">No orders found.</div>}
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex gap-4 items-center">
                                <img src={item.imageUrl} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                                <div>
                                    <div className="font-extrabold text-secondary">{item.name}</div>
                                    <div className="font-black text-primary">₹{item.price}</div>
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'add' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl">
                        <form onSubmit={handleAddItem} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Item Name</label>
                                    <input
                                        type="text" required
                                        value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price (₹)</label>
                                    <input
                                        type="number" required
                                        value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                                <select
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold"
                                    value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Main Course">Main Course</option>
                                    <option value="Fast Food">Fast Food</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Healthy">Healthy</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
                                <input
                                    type="text" required
                                    value={newItem.imageUrl} onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold placeholder:text-gray-200"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    required
                                    value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary/20 outline-none font-bold h-32"
                                />
                            </div>
                            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                                Add Item to Menu
                            </button>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Admin;
