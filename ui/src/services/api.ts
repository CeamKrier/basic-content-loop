import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:1955/api"
});

export default apiClient;
