import api from "./api";

const baseURL = "/productos";

const getProductos= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getProducto= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearProducto = async(producto)=>{
    return (await api.post(`${baseURL}`, producto))
}
const editarProducto= async(id, producto)=>{
    return (await api.put(`${baseURL}/${id}`, producto));
}
const eliminarProducto= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}


const getNewProducts= async()=>{
    return (await api.get(`${baseURL}/new/products/`)).data;
}


export default {
    getProductos,
    getProducto,
    crearProducto,
    editarProducto,
    eliminarProducto,
    getNewProducts
}