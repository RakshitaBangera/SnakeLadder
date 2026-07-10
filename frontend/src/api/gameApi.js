import axios from "axios";

const api = axios.create({
    baseURL: "https://snake-ladder-api-fvyf.onrender.com/api"
});

export default api;