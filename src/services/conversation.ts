import api from "@/api/axiosInstance";

// export const getAllConversationsList = async (status: string) => {
//     const url = status ? `/chat-requests?status=${status}` : `/chat-requests`;
//     const res = await axiosInstance.get(url);
//     return res.data;
// };


// export const getConversationMessages = async (id: string) => {
//     const res = await axiosInstance.get(`/threads/${id}/messages`);
//     return res.data;
// };

// export const acceptRequest = async (id: string) => {
//     const res = await axiosInstance.post(`/chat-requests/${id}/accept`);
//     return res.data;
// };


// services/conversation.ts
// Your axios instance

// Get all conversations list with optional status filter
export const getAllConversationsList = async (status: string = "all") => {
    const params = status !== "all" ? { status: status.toUpperCase() } : {};
    const response = await api.get("/chat-requests", { params });
    return response.data;
};

// Get messages for a specific thread
export const getConversationMessages = async (threadId: string | null) => {
    if (!threadId) {
        throw new Error("Thread ID is required");
    }
    const response = await api.get(`/threads/${threadId}/messages`);
    return response.data;
};

// Accept a chat request
export const acceptRequest = async (requestId: string) => {
    const response = await api.post(`/chat-requests/${requestId}/accept`);
    return response.data;
};

// Decline a chat request
export const declineRequest = async (requestId: string) => {
    const response = await api.post(`/chat-requests/${requestId}/decline`);
    return response.data;
};

// Send a chat request (if needed)
export const sendChatRequest = async (data: { receiver_id: string; message?: string }) => {
    const response = await api.post("/chat-requests", data);
    return response.data;
};

// Send message via REST (fallback, but prefer socket)
export const sendMessage = async (threadId: string, message: string) => {
    const response = await api.post(`/threads/${threadId}/messages`, { message });
    return response.data;
};