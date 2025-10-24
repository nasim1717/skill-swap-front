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

export const getReviews = async (id: string) => {
    const res = await axiosInstance.get(`/users/reviews/${id}`);
    return res.data;
};

export const uploadProfileImage = async (formData: FormData) => {
    return await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};