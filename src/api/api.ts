import axios from 'axios'
import {ContactType} from '../types/types'

type LoginType = {
    login: string
    password: string
}
export const API = {
    auth(data: LoginType) {
        return axios.post('http://localhost:3000/login', {
            username: data.login,
            password: data.password
        })
            .then(res => res)
            .catch(error => console.log(error))
    },
    getContacts(id: number) {
        return axios.get(`http://localhost:3000/contacts?userId=${id}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    },
    addContact(contact: ContactType, id: number) {
        return axios.post(`http://localhost:3000/users/${id}`)
            .then(res => res)
            .catch(error => console.log(error))
    },
    removeContact(id: number) {
        return axios.delete(`http://localhost:3000/contacts/${id}`)
            .then(res => res)
            .catch(error => console.log(error))
    }
}