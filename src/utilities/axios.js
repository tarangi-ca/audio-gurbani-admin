import axios from "axios"

const request = axios.create({
    baseURL: import.meta.env.VITE_AUDIO_GURBANI_API_URL,
})

request.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("token")
        if (token) {
            request.headers.Authorization = `Bearer ${token}`
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request
