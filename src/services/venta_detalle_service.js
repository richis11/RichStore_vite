import api from "./api";

const baseURL = "/venta_detalles";

const getVenta_detalles= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getVenta_detalle= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearVenta_detalle = async(venta_detalle)=>{
    return (await api.post(`${baseURL}`, venta_detalle))
}
const editarVenta_detalle= async(id, venta_detalle)=>{
    return (await api.put(`${baseURL}/${id}`, venta_detalle));
}
const eliminarVenta_detalle= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getVenta_detalles,
    getVenta_detalle,
    crearVenta_detalle,
    editarVenta_detalle,
    eliminarVenta_detalle
}