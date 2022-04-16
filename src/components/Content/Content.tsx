import React, {memo, useEffect, useState} from 'react'
import styles from './Content.module.css'
import {ContactType, StateType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {ContactItem} from '../ContactItem/ContactItem'
import {sort} from '../../utils/sort'
import {SearchAndAddContact} from './SearchAndAddContact/SearchAndAddContact'
import {HeaderTable} from './HeaderTable/HeaderTable'
import {FormAddEditContact} from '../FormAddEditContact/FormAddEditContact'
import {contactsAPI} from '../../api/contactsAPI'
import {useSearchParams} from 'react-router-dom'

export const Content: React.FC = memo(() => {
    const [searchStr, setSearchStr] = useState('')
    const [visibleAddForm, setVisibleAddForm] = useState(false)

    let [searchParams, setSearchParams] = useSearchParams()

    const searchQuery = searchParams.get('search') || ''

    const userId = useSelector((state: StateType) => state.userId)

    const dispatch = useDispatch()
    //создаем копию массива контактов для сортировки(чтобы не мутировать данные в стейте)
    let items = sort(JSON.parse(JSON.stringify(useSelector((state: StateType) => state.contacts))))

    // Поиск в контактах по значению из input
    items = items.filter((item: ContactType) => item.surname.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.company.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.address.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.number?.toString().includes(searchStr.toLowerCase())
    )

    useEffect(() => {
        if (searchStr !== '') {
            setSearchParams({search: searchStr})
        } else {
            setSearchParams('')
        }
    }, [searchStr, setSearchParams])

    useEffect(() => {
        if (searchQuery !== '') {
            setSearchStr(searchQuery)
        }
    }, [searchQuery, setSearchStr])

    useEffect(() => {
        contactsAPI.getContacts(userId)
            //добавляем все контакты авторизованного пользователя в стейт
            .then(res => dispatch(actions.addAllContacts(res)))
            .catch(error => console.log(error))
    }, [dispatch, userId])

    const closeAddForm = () => {
        setVisibleAddForm(false)
    }

    const addContact = (contact: ContactType) => {
        contactsAPI.getMaxContactId()
            .then(res => {
                contactsAPI.addContact(contact, res + 1)
                    .then(() => {
                        dispatch(actions.addContact(contact, res + 1))
                        setVisibleAddForm(false)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.wrapper}>
            <SearchAndAddContact
                searchStr={searchStr}
                setSearchStr={setSearchStr}
                visibleAddForm={visibleAddForm}
                setVisibleAddForm={setVisibleAddForm}
            />
            <HeaderTable/>
            {visibleAddForm &&
            <div className={styles.addContactForm}>
                <FormAddEditContact
                    type='AddForm'
                    initialValues={{
                        id: 0,
                        surname: '',
                        name: '',
                        company: '',
                        address: '',
                        number: '',
                        userId: userId
                    }}
                    addContact={addContact}
                    closeAddForm={closeAddForm}
                />
            </div>}
            {items.map((item: ContactType) =>
                <ContactItem
                    highLight={searchStr}
                    item={item}
                    key={item.id}
                />
            )}
        </div>
    )
})