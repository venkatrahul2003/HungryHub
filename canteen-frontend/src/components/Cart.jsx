import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <ShoppingBag className="text-primary" />
                                Your Order
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag size={48} className="text-gray-300" />
                                    </div>
                                    <h3 className="font-bold text-gray-400">Your cart is empty</h3>
                                    <p className="text-sm">Looks like you haven't added anything yet</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold">{item.name}</h4>
                                                <div className="text-primary font-bold mb-2">₹{item.price}</div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                                        className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                                        className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between mb-4">
                                <span className="text-text-muted font-medium text-lg">Subtotal</span>
                                <span className="font-extrabold text-lg text-secondary">₹{total}</span>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-text-muted font-medium text-lg">Delivery Fee</span>
                                <span className="text-green-600 font-extrabold text-lg tracking-tight">FREE DELIVERY</span>
                            </div>
                            <div className="border-t border-dashed border-gray-200 my-6"></div>
                            <div className="flex justify-between mb-10 text-2xl">
                                <span className="font-black text-secondary">To Pay</span>
                                <span className="font-black text-primary">₹{total}</span>
                            </div>

                            <button
                                disabled={items.length === 0}
                                onClick={onCheckout}
                                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 text-white font-black text-xl py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:translate-y-0"
                            >
                                Checkout Now
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
