import axios from 'axios'

type LoginType = {
    login: string
    password: string
}
export const API = {
    auth(data: LoginType) {
        return axios.post('http://localhost:3000/auth/login', {
            username: data.login,
            password: data.password
        })
            .then(res => res)
            .catch(error => console.log(error))
    }
}