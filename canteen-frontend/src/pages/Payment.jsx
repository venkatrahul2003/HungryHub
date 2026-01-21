import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle2, ShieldCheck, Lock, ArrowRight, Smartphone, Building2, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [status, setStatus] = useState('idle'); // idle, processing, 3dsecure, success, upi_qr
    const [paymentMethod, setPaymentMethod] = useState('upi_qr'); // card, upi_qr, upi_id, netbanking, counter
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const UPI_VPA = "7386507665@ybl"; // Canteen VPA
    const PAYEE_NAME = "Canteen Admin";

    const generateUPIUrl = () => {
        const params = new URLSearchParams({
            pa: UPI_VPA,
            pn: PAYEE_NAME,
            am: cartTotal.toFixed(2),
            cu: "INR",
            tn: `ORDER-${Date.now()}`
        });
        return `upi://pay?${params.toString()}`;
    };

    const handlePay = () => {
        if (paymentMethod === 'card') {
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                setError('All payment fields are required');
                return;
            }
            setStatus('processing');
            setTimeout(() => setStatus('3dsecure'), 1500);
        } else if (paymentMethod === 'upi_qr') {
            setStatus('upi_qr');
        } else if (paymentMethod === 'upi_id') {
            if (!upiId || !upiId.includes('@')) {
                setError('Please enter a valid UPI ID');
                return;
            }
            setStatus('processing');
            setTimeout(() => setStatus('3dsecure'), 1500);
        } else if (paymentMethod === 'counter') {
            handleCompleteOrder('COUNTER', 'LOCAL_SKIP');
            return;
        }

        setError('');
    };

    const handleCompleteOrder = async (method, ref) => {
        setStatus('processing');
        try {
            const orderData = {
                customerName: user?.name || cardDetails.name || `User-${Date.now()}`,
                totalAmount: cartTotal,
                items: cart.map(item => ({
                    menuItemId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                status: method === 'COUNTER' ? 'PENDING' : 'PAID',
                paymentMethod: method,
                transactionRef: ref || 'LOCAL-SHORTCUT'
            };

            await axios.post('http://localhost:8080/api/orders', orderData);
            setStatus('success');
            clearCart();
            setTimeout(() => navigate('/orders'), 3000);
        } catch (err) {
            setError('Failed to process order. Please check connection.');
            setStatus('idle');
        }
    };

    const handleVerifyQRCode = () => {
        if (!transactionId || transactionId.length < 6) {
            setError('Please enter a valid Transaction Ref for verification');
            return;
        }
        handleCompleteOrder('UPI_QR', transactionId);
    };


    const handle3DSecureVerify = async () => {
        setStatus('processing');
        try {
            const orderData = {
                customerName: paymentMethod === 'card' ? cardDetails.name : (upiId || 'UPI Customer'),
                totalAmount: cartTotal,
                items: cart.map(item => ({
                    menuItemId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                status: 'PAID'
            };

            await axios.post('http://localhost:8080/api/orders', orderData);

            setStatus('success');
            clearCart();
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError('Failed to place order. Please try again.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="w-40 h-40 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-green-100/50">
                        <CheckCircle2 size={80} strokeWidth={3} />
                    </div>
                    <h1 className="text-7xl font-black text-secondary mb-6 tracking-tight">Success!</h1>
                    <p className="text-3xl text-text-muted font-medium mb-12">Your food is on its way.</p>
                    <div className="text-xl font-black text-primary uppercase tracking-[0.4em] animate-pulse">Redirecting to Home...</div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-8 relative font-jakarta">
            <AnimatePresence>
                {status === '3dsecure' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-secondary/90 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[4rem] p-16 max-w-xl w-full shadow-2xl border-8 border-gray-50 text-center"
                        >
                            <ShieldCheck size={80} className="mx-auto text-primary mb-8" />
                            <h2 className="text-4xl font-black text-secondary tracking-tight">One-Time Password</h2>
                            <p className="text-xl text-text-muted mt-4 font-bold">Verifying ₹{cartTotal.toFixed(2)}</p>
                            <input
                                type="text" placeholder="ENTER 6 DIGIT OTP"
                                className="w-full mt-10 p-6 rounded-2xl bg-surface border-4 border-primary/10 text-center font-black text-3xl tracking-[0.5em] focus:border-primary outline-none"
                            />
                            <button onClick={handle3DSecureVerify} className="w-full btn-premium py-6 text-2xl mt-8">Submit & Pay</button>
                            <button onClick={() => setStatus('idle')} className="mt-8 text-gray-400 font-bold uppercase text-sm tracking-widest hover:text-primary">Cancel Transaction</button>
                        </motion.div>
                    </motion.div>
                )}

                {status === 'upi_qr' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-3xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[4rem] p-10 max-w-3xl w-full shadow-2xl border-4 border-white overflow-hidden relative"
                        >
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-4xl font-black text-secondary tracking-tight mb-4">Pay Instantly</h2>
                                    <p className="text-lg text-text-muted font-medium mb-8">Scan to pay exactly <span className="text-primary font-black">₹{cartTotal.toFixed(2)}</span></p>

                                    <div className="space-y-4 text-left">
                                        <label className="block text-xs font-black text-secondary uppercase tracking-[0.2em]">Transaction / UTR Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter 12-digit Ref No."
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-primary/20 focus:border-primary outline-none font-black text-xl"
                                        />
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Provide the UTR from your bank app to confirm</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-6 bg-surface p-10 rounded-[4rem]">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generateUPIUrl())}`}
                                        alt="UPI QR Code"
                                        className="w-56 h-56 md:w-64 md:h-64 object-contain shadow-xl rounded-2xl"
                                    />
                                    <div className="flex gap-4 opacity-50">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/800px-UPI-Logo.png" className="h-4" alt="UPI" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Google_Pay_Logo.svg" className="h-4" alt="GPay" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-6">
                                <button onClick={() => setStatus('idle')} className="py-6 rounded-2xl font-black uppercase tracking-widest text-sm text-gray-400 hover:bg-surface transition-all">Cancel</button>
                                <button onClick={handleVerifyQRCode} className="btn-premium py-6 text-xl">Verify Payment</button>
                            </div>
                            {error && <div className="absolute top-0 left-0 w-full bg-red-600 text-white p-4 text-center font-bold">{error}</div>}
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>

            <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[5rem] overflow-hidden shadow-2xl border-[12px] border-white">
                {/* Left Side: Summary */}
                <div className="bg-secondary p-16 text-white flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">C</div>
                            <span className="text-3xl font-black tracking-tighter">Canteen<span className="text-primary">.</span></span>
                        </div>
                        <h2 className="text-6xl font-black mb-12 tracking-tight">Secure <br /><span className="text-primary">Checkout</span></h2>

                        <div className="space-y-8 mb-16">
                            <div className="flex justify-between text-xl font-bold text-gray-400">
                                <span>Item Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-400">
                                <span>Delivery Fee</span>
                                <span className="text-green-400">FREE</span>
                            </div>
                            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">To Pay</div>
                                    <div className="text-6xl font-black">₹{cartTotal.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex items-center gap-6">
                        <Lock className="text-primary" size={32} />
                        <div className="text-sm font-bold opacity-60">Your payment is encrypted and secured by industrial-grade security protocols.</div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-16">
                    <div className="flex gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { id: 'upi_qr', name: 'Scan QR', icon: Smartphone },
                            { id: 'card', name: 'Card', icon: CreditCard },
                            { id: 'counter', name: 'Skip (Testing)', icon: CheckCircle2 },
                            { id: 'upi_id', name: 'VPA', icon: Smartphone },
                            { id: 'netbanking', name: 'Banks', icon: Building2 }
                        ].map(method => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${paymentMethod === method.id
                                    ? 'bg-secondary text-white shadow-2xl scale-105'
                                    : 'bg-surface text-gray-400 border-2 border-transparent hover:border-gray-100'
                                    }`}
                            >
                                <method.icon size={18} /> {method.name}
                            </button>
                        ))}

                    </div>

                    <h1 className="text-4xl font-black text-secondary mb-10">Payment Details</h1>

                    {error && <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-8 font-bold border-2 border-red-100">{error}</div>}

                    <div className="space-y-8">
                        {paymentMethod === 'card' && (
                            <>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Cardholder Name</label>
                                    <input
                                        type="text" placeholder="NAME AS ON CARD"
                                        className="w-full p-5 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 outline-none font-bold text-lg"
                                        value={cardDetails.name} onChange={e => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Card Number</label>
                                    <input
                                        type="text" placeholder="0000 0000 0000 0000"
                                        className="w-full p-5 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 outline-none font-bold text-lg tracking-widest"
                                        value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <input
                                        type="text" placeholder="MM/YY"
                                        className="w-full p-5 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 outline-none font-bold text-lg"
                                        value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                    />
                                    <input
                                        type="password" placeholder="CVV"
                                        className="w-full p-5 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 outline-none font-bold text-lg shadow-sm"
                                        value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        {paymentMethod === 'upi_qr' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary/5 p-12 rounded-[4rem] border-4 border-dotted border-primary/20 text-center">
                                <Smartphone size={60} className="mx-auto text-primary mb-6" />
                                <h3 className="text-3xl font-black text-secondary mb-4">Direct Merchant Pay</h3>
                                <p className="text-lg text-text-muted font-bold mb-10">Scan to pay ₹{cartTotal.toFixed(2)} to {PAYEE_NAME}</p>
                                <button onClick={handlePay} className="bg-secondary text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-primary transition-all">Generate My QR</button>
                            </motion.div>
                        )}

                        {paymentMethod === 'upi_id' && (
                            <div className="space-y-6">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Your UPI ID</label>
                                <input
                                    type="text" placeholder="user@okaxis"
                                    className="w-full p-6 rounded-3xl bg-surface border-4 border-transparent focus:border-primary/20 outline-none font-black text-2xl"
                                    value={upiId} onChange={e => setUpiId(e.target.value)}
                                />
                                <div className="flex gap-4 opacity-40 grayscale">
                                    {['PhonePe', 'GPay', 'Paytm'].map(app => <span key={app} className="text-xs font-black uppercase tracking-widest">{app}</span>)}
                                </div>
                            </div>
                        )}


                        {paymentMethod === 'counter' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-orange-50 p-12 rounded-[4rem] border-4 border-dashed border-orange-200 text-center">
                                <CheckCircle2 size={60} className="mx-auto text-orange-500 mb-6" />
                                <h3 className="text-3xl font-black text-secondary mb-4">Pay at Counter</h3>
                                <p className="text-lg text-text-muted font-bold mb-10">Choose this to skip online payment and pay directly when collecting your food.</p>
                                <button onClick={handlePay} className="bg-orange-500 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200">Confirm Order</button>
                            </motion.div>
                        )}

                        {paymentMethod !== 'upi_qr' && (
                            <button
                                onClick={handlePay}
                                disabled={status === 'processing'}
                                className="w-full btn-premium py-10 text-4xl shadow-xl active:scale-95"
                            >
                                {status === 'processing' ? 'Verifying...' : `Pay ₹${cartTotal.toFixed(2)}`}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
