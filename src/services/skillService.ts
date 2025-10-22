import axiosInstancex from "@/api/axiosInstance";

export const getSkillOfferd = async () => {
    const res = await axiosInstancex.get("/users/offerd-skills");

    return res.data;
};

export const createSkillOfferd = async (data: Record<string, unknown>) => {
    const res = await axiosInstancex.post("/users/offerd-skills", data);

    return res.data;
};

export const getSkillWantted = async () => {
    const res = await axiosInstancex.get("/users/wanted-skills");

    return res.data;
}

export const createSkillWantted = async (data: Record<string, unknown>) => {
    const res = await axiosInstancex.post("/users/wanted-skills", data);

    return res.data;
}