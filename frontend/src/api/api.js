import axios from 'axios'
export const uploads = 'http://localhost:5000/uploads';

export const api=axios.create({
  baseURL:'http://localhost:5000/api'
})

