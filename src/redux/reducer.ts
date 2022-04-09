import {ActionsTypes, ContactType, StateType} from '../types/types'

const initialState = {
    contacts: [] as ContactType[]
}
export const reducer = (state = initialState, action: ActionsTypes): StateType => {
    switch (action.type) {
        case 'ADD_ALL_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'REMOVE_CONTACT':
            const newState = state.contacts.filter(item=> item != action.contact)
            return {
                ...state,
                contacts: newState
            }
        default:
            return state
    }
}