import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/orders');
                // Filter orders by current user name for simplicity in this demo demo
                const userOrders = res.data.filter(o => o.customerName === user?.name).reverse();
                setOrders(userOrders);
            } catch (err) {
                console.error('Failed to fetch orders');
            }
            setLoading(false);
        };
        fetchOrders();
    }, [user]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl font-black text-primary animate-pulse tracking-widest uppercase">Fetching Orders...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 font-jakarta">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-secondary text-white rounded-[2rem] flex items-center justify-center shadow-xl">
                        <ClipboardList size={32} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-secondary tracking-tighter">My Orders</h1>
                        <p className="text-gray-400 font-bold tracking-wide mt-1 uppercase text-xs">History of your campus cravings</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-[4rem] p-20 text-center shadow-2xl border-8 border-gray-50">
                        <ShoppingBag size={80} className="mx-auto text-gray-200 mb-8" />
                        <h2 className="text-3xl font-black text-secondary mb-4">No Orders Yet</h2>
                        <p className="text-gray-400 font-medium mb-10">Your appetite is waiting for its first adventure!</p>
                        <a href="/" className="btn-premium px-10 py-4 inline-block">Explore Menu</a>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={order.id}
                                className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100 group hover:border-primary/20 transition-all"
                            >
                                <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-50">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-primary font-black shadow-inner">
                                            #{order.id}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Order On</span>
                                                <span className="text-sm font-black text-secondary">{new Date(order.orderTime).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 font-bold">
                                                <Clock size={14} />
                                                <span className="text-xs">{new Date(order.orderTime).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Grand Total</div>
                                        <div className="text-3xl font-black text-secondary tracking-tighter">₹{order.totalAmount}</div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">Order Summary</div>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items?.map((item, idx) => (
                                                <span key={idx} className="bg-surface px-4 py-2 rounded-xl text-xs font-black text-secondary border border-gray-50">
                                                    {item.quantity}x {item.name || 'Food Item'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-6">
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1">Payment via {order.paymentMethod || 'CASH'}</div>
                                            <div className="flex items-center gap-2 text-green-600 font-black uppercase text-xs tracking-widest">
                                                <CheckCircle2 size={16} />
                                                {order.status}
                                            </div>
                                        </div>
                                        <ChevronRight className="text-gray-200 group-hover:text-primary transition-colors" size={32} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
