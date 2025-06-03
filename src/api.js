import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mongo-backkk.onrender.com/api'

})

export default api
