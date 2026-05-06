import api from './api';

export const tagService = {
    getAll: async () => {
        const response = await api.get('/tags');
        return response.data;
    },
    create: async (tagData) => {
        const response = await api.post('/tags', tagData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/tags/${id}`);
        return response.data;
    }
};
