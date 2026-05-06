import React from 'react';
import { Star, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';
import Avatar from './Avatar';
import TagBadge from './TagBadge';

const ContactCard = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fade-in group">
      <div className="flex justify-between items-start mb-4">
        <Avatar firstName={contact.firstName} lastName={contact.lastName} />
        <button 
          onClick={() => onToggleFavorite(contact.id)}
          className={`p-2 rounded-full transition-all ${contact.isFavorite ? 'text-yellow-400 bg-yellow-50' : 'text-slate-300 hover:text-yellow-400 hover:bg-yellow-50'}`}
        >
          <Star className={contact.isFavorite ? 'fill-current' : ''} size={20} />
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-1">
        {contact.firstName} {contact.lastName}
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-slate-500 text-sm">
          <Mail size={14} className="mr-2" />
          {contact.email}
        </div>
        {contact.phone && (
          <div className="flex items-center text-slate-500 text-sm">
            <Phone size={14} className="mr-2" />
            {contact.phone}
          </div>
        )}
        {contact.address && (
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin size={14} className="mr-2" />
            {contact.address}
          </div>
        )}
      </div>

      <div className="flex flex-wrap mb-6">
        {contact.tagNames?.map((tagName, index) => (
          <TagBadge key={index} name={tagName} />
        ))}
      </div>

      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(contact.id)}
          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(contact.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
