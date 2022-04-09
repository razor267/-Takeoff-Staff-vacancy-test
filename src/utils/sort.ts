import {ContactType} from '../types/types'

//Сортируем контакты в алфавитном порядке по фамилии
export const sort = (contacts: ContactType[]) => {
    contacts.sort(function (a, b) {
        let firstSurname = a.surname.toLowerCase()
        let secondSurname = b.surname.toLowerCase()
        if (firstSurname < secondSurname) return -1
        if (firstSurname > secondSurname) return 1
        return 0
    })
    return contacts
}