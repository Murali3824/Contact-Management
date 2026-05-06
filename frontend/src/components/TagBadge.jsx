import React from 'react';

const TagBadge = ({ name }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2 mb-1">
      {name}
    </span>
  );
};

export default TagBadge;
