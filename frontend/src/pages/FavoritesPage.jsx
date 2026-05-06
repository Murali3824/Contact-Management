import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Loader2 } from 'lucide-react';
import { contactService } from '../services/contactService';
import Navbar from '../components/Navbar';
import ContactCard from '../components/ContactCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await contactService.getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await contactService.toggleFavorite(id);
      // Since we are in Favorites page, removing a favorite should hide it
      setFavorites(favorites.filter(c => c.id !== id));
    } catch (err) {
      console.error('Toggle favorite failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(id);
        setFavorites(favorites.filter(c => c.id !== id));
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Star className="text-yellow-400 mr-2 fill-current" size={32} />
            Favorite Contacts
          </h1>
          <p className="text-slate-500 mt-1">Your most important connections in one place.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Loading your favorites...</p>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-20 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="bg-yellow-50 p-6 rounded-full mb-6 text-yellow-400">
              <Star size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No favorites yet</h2>
            <p className="text-slate-500 max-w-sm mb-8">
              Mark contacts as favorites by clicking the star icon to see them here.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary px-8 py-3"
            >
              Go to Contact List
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
