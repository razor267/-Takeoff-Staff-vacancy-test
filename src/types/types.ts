import {actions} from '../redux/actions'

export type ContactType = {
    id: number
    name: string
    surname: string
    company: string
    address: string
    number: number
}

export type StateType = {
    contacts: ContactType[]
}

type InferActionsTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes = ReturnType<InferActionsTypes<typeof actions>>