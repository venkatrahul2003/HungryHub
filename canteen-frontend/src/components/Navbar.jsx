import React from 'react';
import { ShoppingBag, User, LogOut, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartCount, onOpenCart }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass sticky top-0 z-50 py-5 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link to="/" className="text-3xl font-extrabold text-primary tracking-tighter cursor-pointer no-underline">
          Canteen<span className="text-secondary">.</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-secondary group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User size={20} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Welcome</div>
                  <div className="font-extrabold text-sm leading-tight">{user.name}</div>
                </div>
              </div>
              <Link to="/orders" className="p-2 hover:bg-surface rounded-lg text-secondary transition-all">
                <ClipboardList size={20} />
              </Link>

              <button
                onClick={logout}
                className="w-9 h-9 rounded-lg bg-surface hover:bg-red-50 text-text-muted hover:text-red-500 transition-all flex items-center justify-center border border-gray-100"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-3 text-text-muted hover:text-primary transition-all group no-underline">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-gray-100">
                <User size={20} />
              </div>
              <span className="font-bold text-sm hidden sm:block">Login</span>
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="px-5 py-2.5 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all">
              Dashboard
            </Link>
          )}

          <button
            onClick={onOpenCart}
            className="group relative w-10 h-10 bg-surface text-secondary rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm border border-gray-100"
          >

            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-lg border-2 border-white shadow-xl">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
