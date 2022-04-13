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
        return axios.post('http://localhost:3000/contacts/', {
            id: id,
            name: contact.name,
            surname: contact.surname,
            company: contact.company,
            address: contact.address,
            number: contact.number,
            userId: contact.userId
        })
            .then(res => res)
            .catch(error => console.log(error))
    },
    editContact(contact: ContactType, id: number) {
        return axios.put(`http://localhost:3000/contacts/${id}`, {
            id: id,
            name: contact.name,
            surname: contact.surname,
            company: contact.company,
            address: contact.address,
            number: contact.number,
            userId: contact.userId
        })
            .then(res => res)
            .catch(error => console.log(error))
    },
    removeContact(id: number) {
        return axios.delete(`http://localhost:3000/contacts/${id}`)
            .then(res => res)
            .catch(error => console.log(error))
    },
    getMaxContactId() {
        return axios.get('http://localhost:3000/contacts')
            // получаем максимальный id контактов
            .then(res => res.data[res.data.length - 1].id)
            .catch(error => console.log(error))
    }
}