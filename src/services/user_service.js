import api from "./api";

const baseURL = "/users";

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
    eliminarUser
}