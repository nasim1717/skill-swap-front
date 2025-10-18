import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5051/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },

});

export default axiosInstance;
