//import api from "./api";
import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3500/"
})

const baseURL = "/login";

const loginUser = async(user)=>{
    return (await api.post(`${baseURL}`, user))
}

const getUsers= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getUser= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearUser = async(user)=>{
    return (await api.post(`${baseURL}`, user))
}
const editarUser= async(id, user)=>{
    return (await api.put(`${baseURL}/${id}`, user));
}
const eliminarUser= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getUsers,
    getUser,
    crearUser,
    editarUser,
    eliminarUser,
    loginUser
}