import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.16.8.20:3333'
})