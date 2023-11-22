//import api from "./api";
import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/"
})

const baseURL = "/login";

const loginUser = async(user)=>{
    return (await api.post(`${baseURL}`, user))
}

export default {
    loginUser
}