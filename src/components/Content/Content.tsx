import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './Content.module.css'
import plusLogo from '../../img/plus.svg'
import {contacts} from '../../db'
import {ContactType, FormContactType, StateType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {RadialWhiteDiv} from '../RadialWhiteDiv/RadialWhiteDiv'
import cn from 'classnames'
import {sort} from '../../utils/sort'

export const Content: React.FC = () => {

    const [contactParts, setContactParts] = useState<ContactType[] | null>(null)
    const [highLightText, setHighLightText] = useState<string>('')
    const [visibleAddForm, setVisibleAddForm] = useState(false)

    const dispatch = useDispatch()
    //создаем копию массива контактов для сортировки(чтобы не мутировать данные в стейте)
    const items = sort(JSON.parse(JSON.stringify(useSelector((state: StateType) => state.contacts))))


    useEffect(() => {
        dispatch(actions.addAllContacts(contacts))  //добавляем все контакты в стейт при первичном рендере
    }, [dispatch])

    // Поиск в контактах по значению из input
    const search = (str: string) => {
        setHighLightText(str)
        setContactParts(items.filter((item: ContactType) => item.surname.toLowerCase().includes(str.toLowerCase()) ||
            item.name.toLowerCase().includes(str.toLowerCase()) ||
            item.company.toLowerCase().includes(str.toLowerCase()) ||
            item.address.toLowerCase().includes(str.toLowerCase()) ||
            item.number.toString().includes(str.toLowerCase())
        ))
    }

    const closeAddForm = () => {
        setVisibleAddForm(false)
    }

    const addContact = (contact: FormContactType) => {
        dispatch(actions.addContact(contact))
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
                <RadialWhiteDiv type='addForm' closeAddForm={closeAddForm} addContact={addContact}/>
            </div>}
            {contactParts ?
                contactParts.map(item => <RadialWhiteDiv type='contactItem' item={item} key={item.id}
                                                         highLight={highLightText}/>) :
                items.map((item: ContactType) => <RadialWhiteDiv type='contactItem' item={item} key={item.id}/>)}
        </div>
    )
}