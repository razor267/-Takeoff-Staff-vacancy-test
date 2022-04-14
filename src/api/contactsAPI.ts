import {ContactType} from '../types/types'
import {instance} from './api'

export const contactsAPI = {
    getContacts(id: number) {
        return instance.get(`contacts?userId=${id}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    },
    addContact(contact: ContactType, id: number) {
        return instance.post('contacts/', {
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
        return instance.put(`contacts/${id}`, {
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
        return instance.delete(`contacts/${id}`)
            .then(res => res)
            .catch(error => console.log(error))
    },
    getMaxContactId() {
        return instance.get('contacts')
            // получаем максимальный id контактов
            .then(res => res.data[res.data.length - 1].id)
            .catch(error => console.log(error))
    }
}