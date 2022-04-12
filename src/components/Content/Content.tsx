import React, {memo, useEffect, useState} from 'react'
import styles from './Content.module.css'
import {ContactType, FormContactType, StateType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {ContactItem} from '../ContactItem/ContactItem'
import {sort} from '../../utils/sort'
import {SearchAndAddContact} from './SearchAndAddContact/SearchAndAddContact'
import {HeaderTable} from './HeaderTable/HeaderTable'
import {FormAddEditContact} from '../FormAddEditContact/FormAddEditContact'
import {API} from '../../api/api'

export const Content: React.FC = memo(() => {

    const [searchStr, setSearchStr] = useState('')
    const [visibleAddForm, setVisibleAddForm] = useState(false)

    const userId =  useSelector((state: StateType) => state.userId)

    const dispatch = useDispatch()
    //создаем копию массива контактов для сортировки(чтобы не мутировать данные в стейте)
    let items = sort(JSON.parse(JSON.stringify(useSelector((state: StateType) => state.contacts))))

    // Поиск в контактах по значению из input
    items = items.filter((item: ContactType) => item.surname.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.company.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.address.toLowerCase().includes(searchStr.toLowerCase()) ||
        item.number.toString().includes(searchStr.toLowerCase())
    )

    useEffect(() => {
        API.getContacts(userId)
            .then(res => dispatch(actions.addAllContacts(res))) //добавляем все контакты в стейт при первичном рендере
            .catch(error => console.log(error))
    }, [dispatch, userId])

    const closeAddForm = () => {
        setVisibleAddForm(false)
    }

    const addContact = (contact: FormContactType) => {

        // API.addContact(contact, userId)
        //     .then(res => {
        //         debugger
        //         dispatch(actions.addContact(contact))
        //     }) //добавляем новый контакт
        //     .catch(error => console.log(error))

        dispatch(actions.addContact(contact))
        setVisibleAddForm(false)
    }

    return (
        <div className={styles.wrapper}>
            <SearchAndAddContact
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
                        surname: '',
                        name: '',
                        company: '',
                        address: '',
                        number: ''
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