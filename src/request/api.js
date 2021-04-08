import axios from 'axios'
const service = axios.create({
    baseURL:'http://192.168.0.174:3000',
    timeout:5000
})