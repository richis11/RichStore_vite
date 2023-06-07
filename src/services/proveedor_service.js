import api from "./api";

const baseURL = "/proveedores";

const getProveedores= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getProveedor= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearProveedor = async(proveedor)=>{
    return (await api.post(`${baseURL}`, proveedor))
}
const editarProveedor= async(id, proveedor)=>{
    return (await api.put(`${baseURL}/${id}`, proveedor));
}
const eliminarProveedor= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getProveedores,
    getProveedor,
    crearProveedor,
    editarProveedor,
    eliminarProveedor
}