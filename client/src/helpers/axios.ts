import axios from "axios";

/** Axios instance */
const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : ''
})

export default Axios;