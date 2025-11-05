import axiosInstance from "@/api/axiosInstance";

export const getMatches = async (searchTerm: string) => {
    const urlCreate = searchTerm ? `/matches?search=${searchTerm}` : `/matches`;
    const res = await axiosInstance.get(`/matches?search=${searchTerm}`);
    return res.data;
};


export const connectRequest = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.post("/chat-requests", data);
    return res.data;
};