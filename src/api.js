import axios from 'axios'

const api = axios.create({
   baseURL: 'http://3.80.210.237:5000/api'

})

export default api
