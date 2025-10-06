import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL


export  const axiosClient = axios.create({
    baseURL:`${URL}/api/v1`
})