import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function useThreads() {
    return useQuery(['threads'], () => api.get('/threads').then(r => r.data.data));
}

export function useMessages(threadId) {
    return useQuery(['thread', threadId, 'messages'], () => api.get(`/threads/${threadId}/messages`).then(r => r.data.data), {
        enabled: !!threadId
    });
}
