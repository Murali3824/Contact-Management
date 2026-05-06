import React from 'react';
import { getInitials, getAvatarColor } from '../utils/avatarUtils';

const Avatar = ({ firstName, lastName, size = 'md' }) => {
    const initials = getInitials(firstName, lastName);
    const bgColor = getAvatarColor(firstName);

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-lg',
        lg: 'w-24 h-24 text-3xl',
    };

    return (
        <div 
            style={{ backgroundColor: bgColor }}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold shadow-inner ring-2 ring-white/20`}
        >
            {initials}
        </div>
    );
};

export default Avatar;
