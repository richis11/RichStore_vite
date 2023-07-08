import api from "./api";

const baseURL = "/categorias";

const getCategorias = async () => {
    return (await api.get(`${baseURL}`)).data;
}

const getCategoria = async (id) => {
    return (await api.get(`${baseURL}/${id}`)).data;
}

const crearCategoria = async (categoria) => {
    return (await api.post(`${baseURL}`, categoria));
}

const editarCategoria = async (id, categoria) => {
    return (await api.put(`${baseURL}/${id}`, categoria));
}

const eliminarCategoria = async (id) => {
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getCategorias,
    getCategoria,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
}
