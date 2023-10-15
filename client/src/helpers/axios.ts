import axios from "axios";

/** Axios instance */
const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : ''
})

export default Axios;