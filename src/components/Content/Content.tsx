import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './Content.module.css'
import plusLogo from './plus.svg'
import {contacts} from '../../db'
import {ContactItem} from './ContactItem/ContactItem'
import {ContactType, StateType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {sort} from '../../utils/sort'

export const Content: React.FC = () => {

    const [contactParts, setContactParts] = useState<ContactType[] | null>(null)

    const dispatch = useDispatch()
    const items = useSelector((state: StateType) => state.contacts)

    useEffect(() => {
        dispatch(actions.addAllContacts(contacts))  //добавляем все контакты в стейт при первичном рендере
    }, [])

    // Поиск в контактах по значению из input
    const search = (str: string) => {
        setContactParts(items.filter(item => item.surname.toLowerCase().includes(str.toLowerCase()) ||
            item.name.toLowerCase().includes(str.toLowerCase()) ||
            item.company.toLowerCase().includes(str.toLowerCase()) ||
            item.address.toLowerCase().includes(str.toLowerCase()) ||
            item.number.toString().includes(str.toLowerCase())
        ))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchAndAddContact}>
                <input className={styles.search} placeholder='Поиск...'
                       onChange={(e: ChangeEvent<HTMLInputElement>) => search(e.currentTarget.value)}/>
                <span className={styles.addContact}>
                    <img src={plusLogo} alt="plus"/>
                    <span className={styles.addContactText}>Добавить контакт</span>
                </span>
            </div>
            <div className={styles.header}>
                <span>Фамилия</span>
                <span>Имя</span>
                <span>Компания</span>
                <span>Адрес</span>
                <span>Телефон</span>
            </div>
            {contactParts ?
                contactParts.map(item => <ContactItem item={item} key={item.id}/>) :
                sort(items).map(item => <ContactItem item={item} key={item.id}/>)}
        </div>
    )
}