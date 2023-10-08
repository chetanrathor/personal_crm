import axios, { AxiosResponse } from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL
export const post = <T, D>(endpoint: string, data?: T) => axios.post<{}, AxiosResponse<D>>(`${BASE_URL}${endpoint}`, data)
export const get = <T, D>(endpoint: string, params?: T) => axios.get<{},AxiosResponse<D>>(`${BASE_URL}${endpoint}`, { params })

console.log('BASE_URL', BASE_URL)