import api from "./api";

const baseURL = "/ventas";

const getVentas= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getVenta= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearVenta = async(venta)=>{
    return (await api.post(`${baseURL}`, venta))
}
const editarVenta= async(id, venta)=>{
    return (await api.put(`${baseURL}/${id}`, venta));
}
const eliminarVenta= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getVentas,
    getVenta,
    crearVenta,
    editarVenta,
    eliminarVenta
}