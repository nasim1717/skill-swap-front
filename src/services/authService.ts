import axiosInstance from "@/api/axiosInstance"

export const registerUser = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
}

export const loginUser = async (data: Record<string, unknown>) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
}

export const logoutUser = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};