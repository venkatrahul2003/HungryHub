import React from 'react';
import { Star, Plus, Minus, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const cartItem = cart.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-premium group relative flex flex-col h-full"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 flex-shrink-0">

                <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                    {item.rating >= 4.7 && (
                        <div className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                            <Flame size={12} fill="white" /> BESTSELLER
                        </div>
                    )}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border border-white/20">
                    <span className="text-secondary font-black text-sm">{item.rating || '4.5'}</span>
                    <Star size={14} className="fill-accent text-accent" />
                </div>
            </div>

            <div className="p-6 flex flex-col h-full bg-white">
                <div className="mb-2">
                    <div className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{item.category}</div>
                    <h3 className="font-extrabold text-xl text-secondary group-hover:text-primary transition-colors leading-tight">
                        {item.name}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                    {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="font-black text-2xl text-secondary">₹{item.price}</div>

                    <div className="relative min-w-[120px]">
                        <AnimatePresence mode="wait">
                            {quantity === 0 ? (
                                <motion.button
                                    key="add-btn"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onClick={() => addToCart(item)}
                                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-primary font-black py-2.5 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95"
                                >
                                    <Plus size={18} strokeWidth={3} /> ADD
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="qty-controls"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center justify-between bg-primary text-white rounded-xl overflow-hidden shadow-lg shadow-primary/20 p-1"
                                >
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <Minus size={18} strokeWidth={3} />
                                    </button>
                                    <span className="font-black text-lg w-6 text-center">{quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <Plus size={18} strokeWidth={3} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FoodCard;
