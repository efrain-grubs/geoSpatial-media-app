import axios from 'axios'

const customAxios = axios.create({

withCredentials: true,
baseURL: "https://geospatial-media-app.onrender.com"

})


customAxios.interceptors.request.use((config) =>{


const token = localStorage.getItem('token')

if(token) { 

config.headers.authorization = `Bearer ${token}`



}


return config

})

customAxios.interceptors.response.use((response) => response,async(error) => { 

const originalRequest = error.config


if(error.response?.status === 401 && !originalRequest._retry){

originalRequest._retry = true;
try { 

const response = await customAxios.get('/refresh')

const newToken = response.data.token

localStorage.setItem('token',newToken)


originalRequest.headers.authorization = `Bearer ${newToken}`

return customAxios(originalRequest)



}catch(err) {
    return Promise.reject(err)
}




}


return Promise.reject(error)

})


export default customAxios