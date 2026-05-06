import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag as TagIcon, Loader2 } from 'lucide-react';
import { contactService } from '../services/contactService';
import { tagService } from '../services/tagService';
import Navbar from '../components/Navbar';
import ContactCard from '../components/ContactCard';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await tagService.getAll();
      setTags(data);
      if (data.length > 0) {
        handleSelectTag(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch tags', err);
    } finally {
      setLoadingTags(false);
    }
  };

  const handleSelectTag = async (tag) => {
    setSelectedTag(tag);
    setLoadingContacts(true);
    try {
      const data = await contactService.getByTag(tag.id);
      setContacts(data);
    } catch (err) {
      console.error('Failed to fetch contacts by tag', err);
    } finally {
      setLoadingContacts(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <TagIcon className="text-primary-600 mr-2" size={32} />
            Manage Tags
          </h1>
          <p className="text-slate-500 mt-1">Organize and view contacts by tags.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Tags */}
          <div className="md:w-1/4">
            <div className="glass rounded-2xl p-4 sticky top-24">
              <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">Your Tags</h2>
              {loadingTags ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-primary-600" size={24} />
                </div>
              ) : tags.length > 0 ? (
                <ul className="space-y-1">
                  {tags.map(tag => (
                    <li key={tag.id}>
                      <button
                        onClick={() => handleSelectTag(tag)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedTag?.id === tag.id
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tag.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm px-2">No tags created yet.</p>
              )}
            </div>
          </div>

          {/* Contacts Grid */}
          <div className="md:w-3/4">
            {selectedTag ? (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Contacts in "{selectedTag.name}"
                </h2>
                <p className="text-slate-500">
                  {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} found.
                </p>
              </div>
            ) : null}

            {loadingContacts ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary-600 mb-4" size={40} />
                <p className="text-slate-500 font-medium">Loading contacts...</p>
              </div>
            ) : contacts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
            ) : selectedTag ? (
              <div className="glass rounded-3xl p-16 flex flex-col items-center text-center">
                <div className="bg-slate-100 p-6 rounded-full mb-6 text-slate-400">
                  <TagIcon size={48} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">No contacts with this tag</h2>
                <p className="text-slate-500">Edit a contact and add this tag to see it here.</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TagsPage;
