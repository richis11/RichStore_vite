import axios from "axios";

const api = axios.create({
    //baseURL:"http://localhost:3001/api"
    baseURL:"https://richstorebackend.up.railway.app/api/"
})

export default api;