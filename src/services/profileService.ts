import axiosInstance from "@/api/axiosInstance";

export const getProfile = async (id: string) => {
    const res = await axiosInstance.get(`/users/profile/${id}`);
    return res.data;
};

export const updateProfile = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.put(`/users/update-profile/`, data);
    return res.data;
};

export const reviewUser = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.post("/users/reviews", data);
    return res.data;
};