import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Tag as TagIcon, X } from 'lucide-react';
import { contactService } from '../services/contactService';
import { tagService } from '../services/tagService';
import Navbar from '../components/Navbar';

const AddEditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    tagIds: []
  });
  
  const [allTags, setAllTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTags();
    if (isEdit) {
      fetchContact();
    }
  }, [id]);

  const fetchTags = async () => {
    try {
      const tags = await tagService.getAll();
      setAllTags(tags);
    } catch (err) {
      console.error('Failed to fetch tags', err);
    }
  };

  const fetchContact = async () => {
    try {
      const contact = await contactService.getById(id);
      // Map tag names back to IDs if needed, or assume backend returns IDs
      // For this implementation, we'll assume the backend provides tag names and we match them
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone || '',
        address: contact.address || '',
        tagIds: contact.tagNames?.map(name => allTags.find(t => t.name === name)?.id).filter(Boolean) || []
      });
    } catch (err) {
      setError('Failed to load contact');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await contactService.update(id, formData);
      } else {
        await contactService.create(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const newTag = await tagService.create({ name: newTagName });
      setAllTags([...allTags, newTag]);
      setFormData({ ...formData, tagIds: [...formData.tagIds, newTag.id] });
      setNewTagName('');
    } catch (err) {
      console.error('Failed to create tag', err);
    }
  };

  const toggleTag = (tagId) => {
    const newTagIds = formData.tagIds.includes(tagId)
      ? formData.tagIds.filter(id => id !== tagId)
      : [...formData.tagIds, tagId];
    setFormData({ ...formData, tagIds: newTagIds });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>

        <div className="glass rounded-3xl p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            {isEdit ? 'Edit Contact' : 'Add New Contact'}
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea
                className="input-field resize-none h-24"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">Tags / Groups</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      formData.tagIds.includes(tag.id)
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    className="input-field pl-10 h-10 text-sm"
                    placeholder="Create new tag..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCreateTag())}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCreateTag}
                  className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2 px-8"
              >
                <Save size={18} />
                <span>{loading ? 'Saving...' : 'Save Contact'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditContactPage;
