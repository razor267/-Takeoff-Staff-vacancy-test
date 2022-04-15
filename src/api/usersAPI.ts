import {instance} from './api'
import {UserType} from '../types/types'

export const usersAPI = {
    auth(user: UserType) {
        return instance.post('login', {
            username: user.login,
            password: user.password
        })
            .then(res => res)
            .catch(error => error)
    },
    addUser(user: UserType, id: number) {
        return instance.post('users/', {
            id: id,
            login: user.login,
            password: user.password,
        })
            .then(res => res)
            .catch(error => console.log(error))
    },
    removeUser(id: number) {
        return instance.delete(`users/${id}`)
            .then(res => res)
            .catch(error => console.log(error))
    },
    getMaxUserId() {
        return instance.get('users')
            // получаем максимальный id пользователей
            .then(res => res.data[res.data.length - 1].id)
            .catch(error => console.log(error))
    }
}