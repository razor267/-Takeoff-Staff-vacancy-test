import {ContactType} from '../types/types'

export const actions = {
    //Первичное добавление всех контактов в стейт после их получения с сервера
    addAllContacts: (contacts: ContactType[]) => ({
        type: 'ADD_ALL_CONTACTS',
        contacts
    } as const),
    //Очистка контактов в стейте после выхода
    clearContacts: () => ({
        type: 'CLEAR_CONTACTS'
    } as const),
    //удаляем выбранный контакт
    removeContact: (id: number) => ({
        type: 'REMOVE_CONTACT',
        id
    } as const),
    //добавляем новый контакт
    addContact: (contact: ContactType, id: number) => ({
        type: 'ADD_CONTACT',
        contact,
        id
    } as const),
    //редактируем контакт
    editContact: (contact: ContactType, id: number) => ({
        type: 'EDIT_CONTACT',
        contact,
        id
    } as const),
    //авторизуем пользователя
    login: (id: number) => ({
        type: 'LOGIN',
        id
    } as const),
    //логаут
    logout: () => ({
        type: 'LOGOUT',
        id: 0
    } as const)
}