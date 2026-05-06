import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, Star, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-3 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-600 p-2 rounded-xl">
            <Users className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
            ContactManager
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center space-x-1 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-slate-500 hover:text-primary-600'}`}
          >
            <Users size={18} />
            <span>All Contacts</span>
          </NavLink>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => `flex items-center space-x-1 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-slate-500 hover:text-primary-600'}`}
          >
            <Star size={18} />
            <span>Favorites</span>
          </NavLink>
          <NavLink 
            to="/tags" 
            className={({ isActive }) => `flex items-center space-x-1 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-slate-500 hover:text-primary-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
            <span>Tags</span>
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink to="/add" className="btn-primary flex items-center space-x-1">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Contact</span>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
