import {ContactType} from '../types/types'

export const actions = {
    //Первичное добавление всех контактов в стейт после их получения с сервера
    addAllContacts: (contacts: ContactType[]) => ({
        type: 'ADD_ALL_CONTACTS',
        contacts
    } as const),
    //удаляем выбранный контакт
    removeContact: (contact: ContactType) => ({
        type: 'REMOVE_CONTACT',
        contact
    } as const)
}