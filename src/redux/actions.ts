import {ContactType, FormContactType} from '../types/types'

export const actions = {
    //Первичное добавление всех контактов в стейт после их получения с сервера
    addAllContacts: (contacts: ContactType[]) => ({
        type: 'ADD_ALL_CONTACTS',
        contacts
    } as const),
    //удаляем выбранный контакт
    removeContact: (id: number) => ({
        type: 'REMOVE_CONTACT',
        id
    } as const),
    //добавляем новый контакт
    addContact: (contact: FormContactType) => ({
        type: 'ADD_CONTACT',
        contact
    } as const),
    //редактируем контакт
    editContact: (id: number, contact: FormContactType) => ({
        type: 'EDIT_CONTACT',
        id,
        contact
    } as const)
}