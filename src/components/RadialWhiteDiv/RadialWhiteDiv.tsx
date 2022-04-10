import React, {useState} from 'react'
import styles from './RadialWhiteDiv.module.css'
import editLogo from '../../img/edit.svg'
import deleteLogo from '../../img/delete.svg'
import {ContactType, FormContactType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {highLightText} from '../../utils/highLightText/highLightText'
import {actions} from '../../redux/actions'
import {FormAddEditContact} from '../FormAddEditContact/FormAddEditContact'


type PropsType = {
    item?: ContactType
    highLight?: string
    type: 'contactItem' | 'addForm'
    closeAddForm?: () => void
    addContact?: (contact: FormContactType) => void
}
export const RadialWhiteDiv: React.FC<PropsType> = ({item, highLight, type, closeAddForm, addContact}) => {

    const dispatch = useDispatch()
    const [visibleEditForm, setVisibleEditForm] = useState(false)

    const editContact = (id: number, contact: FormContactType) => {
        dispatch(actions.editContact(id, contact))
        setVisibleEditForm(false)
    }

    const closeEditForm = () => {
        setVisibleEditForm(false)
    }

    switch (type) {
        case 'contactItem':
            if (item) {
                const {name, surname, company, address, number} = item
                return (
                    <div>
                        {!visibleEditForm &&
                        <div className={styles.wrapper}>
                            <span>{highLight ? highLightText(highLight, surname) : surname}</span>
                            <span>{highLight ? highLightText(highLight, name) : name}</span>
                            <span>{highLight ? highLightText(highLight, company) : company}</span>
                            <span>{highLight ? highLightText(highLight, address) : address}</span>
                            <span>{highLight ? highLightText(highLight, number.toString()) : number}</span>
                            <span
                                title='Редактировать'
                                className={styles.edit}
                                onClick={() => setVisibleEditForm(true)}
                            >
                                <img src={editLogo} alt="edit"/>
                            </span>
                            <span
                                title='Удалить'
                                className={styles.delete}
                                onClick={() => dispatch(actions.removeContact(item?.id))}
                            >
                                <img src={deleteLogo} alt="delete"/>
                            </span>
                        </div>}
                        {visibleEditForm &&
                        <FormAddEditContact
                            type='EditForm'
                            editContact={editContact}
                            closeEditForm={closeEditForm}
                            contact={item}
                        />}
                    </div>
                )
            } else return <></>
        case 'addForm':
            return (
                <FormAddEditContact type='AddForm' addContact={addContact} closeAddForm={closeAddForm}/>
            )
        default:
            return <></>
    }
}