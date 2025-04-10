import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
});

export default AxiosInstance;
