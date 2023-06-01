import axios from 'axios'
import apiPath from './apiPath'

const instance = axios.create({
    baseURL: apiPath,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export { instance }