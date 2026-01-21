import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';

const Hero = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative overflow-hidden bg-white pt-24 pb-32">
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-[-5%] w-[50%] h-[100%] bg-rose-50 rounded-full blur-[120px] opacity-60 -z-10" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-amber-50 rounded-full blur-[100px] opacity-50 -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Little badge */}
                        <div className="inline-flex items-center gap-2 bg-secondary/5 text-secondary px-4 py-2 rounded-full font-black text-xs tracking-widest uppercase mb-8 border border-secondary/10">
                            <Navigation size={14} className="text-primary" /> Exclusive for Campus Students
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black text-secondary mb-10 leading-[1] tracking-tightest">
                            Craving for something <br />
                            <span className="text-primary relative inline-block">
                                Delicious?
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="absolute bottom-4 left-0 h-3 bg-primary/10 -z-10"
                                />
                            </span>
                        </h1>

                        {/* Swiggy-style Search Container */}
                        <div className="w-full max-w-3xl mx-auto mb-16 px-4">
                            <div className="relative group p-2 bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-4 text-gray-400 group-focus-within:text-primary transition-colors">
                                    <Search size={26} strokeWidth={2.5} />
                                    <div className="h-8 w-[2px] bg-gray-100" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for your favorite food items..."
                                    className="w-full bg-transparent py-7 pl-24 pr-12 rounded-[1.8rem] outline-none text-secondary font-bold text-xl placeholder:text-gray-300 transition-all"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                                    <button className="bg-secondary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary transition-all shadow-xl active:scale-95">
                                        Find Food
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Features bar */}
                        <div className="flex flex-wrap justify-center gap-12 lg:gap-24 opacity-80">
                            <div className="flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary border border-gray-50 transform group-hover:rotate-12 transition-transform">
                                    <Clock size={28} strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-black text-secondary">15 Mins</div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-widest">Super Fast Delivery</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-accent border border-gray-50 transform group-hover:rotate-12 transition-transform">
                                    <ShieldCheck size={28} strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-black text-secondary">Verified</div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-widest">Hygenic Kitchen</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-green-500 border border-gray-50 transform group-hover:rotate-12 transition-transform">
                                    <MapPin size={28} strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-black text-secondary">Live Track</div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-widest">Order Tracking</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
