import axios from 'axios';

let defaultApi = import.meta.env.VITE_API_HOST
let instance = axios.create({
    timeout: 1000 * 60 * 10,
    baseURL: defaultApi,
    headers: {
        "token": localStorage.getItem('token') || ''
    }
});
// instance.interceptors.request.use(req => {
//     if (req.baseURL === 'https://sign.ipadump.com' || (window.location.host === 'sign.ipadump.com' && req.baseURL === '')) {
//         req.baseURL = 'https://s2.ipadump.com'
//     }
//     return req
// }, err => {
//     return err
// });

export default instance;