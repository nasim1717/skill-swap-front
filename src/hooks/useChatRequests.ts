import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

export function useChatRequests(status = 'ALL') {
    return useQuery(['chat-requests', status], () => axiosInstance.get('/chat-requests', { params: { status } }).then(r => r.data.data));
}

export function useSendChatRequest() {
    const qc = useQueryClient();
    return useMutation(
        (payload) => axiosInstance.post('/chat-requests', payload).then(r => r.data.data),
        { onSuccess: () => qc.invalidateQueries(['chat-requests']) }
    );
}

export function useAcceptRequest() {
    const qc = useQueryClient();
    return useMutation(
        (id) => axiosInstance.post(`/chat-requests/${id}/accept`).then(r => r.data.data),
        {
            onSuccess: () => {
                qc.invalidateQueries(['chat-requests']);
                qc.invalidateQueries(['threads']);
            }
        }
    );
}

export function useDeclineRequest() {
    const qc = useQueryClient();
    return useMutation((id: string) => axiosInstance.post(`/chat-requests/${id}/decline`).then(r => r.data.data), {
        onSuccess: () => qc.invalidateQueries(['chat-requests']),
    });
}
