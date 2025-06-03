import axios from 'axios'

const api = axios.create({
   baseURL: 'https://misensores.duckdns.org/api'
})

export default api
