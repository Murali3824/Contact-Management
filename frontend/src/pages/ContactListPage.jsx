import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Loader2 } from 'lucide-react';
import { contactService } from '../services/contactService';
import Navbar from '../components/Navbar';
import ContactCard from '../components/ContactCard';
import SearchBar from '../components/SearchBar';

const ContactListPage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      console.error('Failed to fetch contacts', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchContacts();
      return;
    }
    try {
      const data = await contactService.search(query);
      setContacts(data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await contactService.toggleFavorite(id);
      setContacts(contacts.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
    } catch (err) {
      console.error('Toggle favorite failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(id);
        setContacts(contacts.filter(c => c.id !== id));
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Contacts</h1>
            <p className="text-slate-500 mt-1">You have {contacts.length} contacts in your address book.</p>
          </div>
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Loading your contacts...</p>
          </div>
        ) : contacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contacts.map(contact => (
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
            <div className="bg-slate-100 p-6 rounded-full mb-6">
              <Users className="text-slate-400" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No contacts found</h2>
            <p className="text-slate-500 max-w-sm mb-8">
              Start building your address book by adding your first contact.
            </p>
            <button 
              onClick={() => navigate('/add')}
              className="btn-primary flex items-center space-x-2 px-8 py-3"
            >
              <Plus size={20} />
              <span>Add Your First Contact</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactListPage;
