const COLORS = [
    '#1A56DB', // blue
    '#059669', // green
    '#7C3AED', // purple
    '#DC2626', // red
    '#D97706', // amber
    '#0891B2', // cyan
    '#BE185D', // pink
];

export function getInitials(firstName = '', lastName = '') {
    const first = firstName.trim().charAt(0).toUpperCase();
    const last = lastName.trim().charAt(0).toUpperCase();
    return last ? `${first}${last}` : first;
}

export function getAvatarColor(name = '') {
    if (!name) return COLORS[0];
    const index = name.charCodeAt(0) % COLORS.length;
    return COLORS[index];
}
