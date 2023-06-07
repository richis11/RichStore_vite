import api from "./api";

const baseURL = "/clientes";

const getClientes= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getCliente= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearCliente = async(cliente)=>{
    return (await api.post(`${baseURL}`, cliente))
}
const editarCliente= async(id, cliente)=>{
    return (await api.put(`${baseURL}/${id}`, cliente));
}
const eliminarCliente= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getClientes,
    getCliente,
    crearCliente,
    editarCliente,
    eliminarCliente
}