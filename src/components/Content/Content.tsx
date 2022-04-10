import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import styles from './Content.module.css'
import plusLogo from '../../img/plus.svg'
import {contacts} from '../../db'
import {ContactItem} from './ContactItem/ContactItem'
import {ContactType, StateType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {sort} from '../../utils/sort'
import {RadialWhiteDiv} from '../RadialWhiteDiv/RadialWhiteDiv'
import cn from 'classnames'

export const Content: React.FC = () => {

    const [contactParts, setContactParts] = useState<ContactType[] | null>(null)
    const [highLightText, setHighLightText] = useState<string>('')
    const [visibleAddForm, setVisibleAddForm] = useState(false)

    const dispatch = useDispatch()
    const items = useSelector((state: StateType) => state.contacts)

    useEffect(() => {
        dispatch(actions.addAllContacts(contacts))  //добавляем все контакты в стейт при первичном рендере
    }, [])

    // Поиск в контактах по значению из input
    const search = (str: string) => {
        setHighLightText(str)
        setContactParts(items.filter(item => item.surname.toLowerCase().includes(str.toLowerCase()) ||
            item.name.toLowerCase().includes(str.toLowerCase()) ||
            item.company.toLowerCase().includes(str.toLowerCase()) ||
            item.address.toLowerCase().includes(str.toLowerCase()) ||
            item.number.toString().includes(str.toLowerCase())
        ))
    }

    const closeForm = () => {
        setVisibleAddForm(false)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchAndAddContact}>
                <input className={styles.search}
                       placeholder='Поиск...'
                       onChange={(e: ChangeEvent<HTMLInputElement>) => search(e.currentTarget.value)}
                />
                <span className={cn(styles.addContact, {
                    [styles.addContactActive]: visibleAddForm
                })} onClick={() => setVisibleAddForm(!visibleAddForm)}>
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
            {visibleAddForm &&
            <div className={styles.addContactForm}>
                <RadialWhiteDiv type='addForm' closeForm={closeForm}/>
            </div>}
            {contactParts ?
                contactParts.map(item => <RadialWhiteDiv type='contactItem' item={item} key={item.id} highLight={highLightText}/>) :
                sort(items).map(item => <RadialWhiteDiv type='contactItem' item={item} key={item.id}/>)}
        </div>
    )
}