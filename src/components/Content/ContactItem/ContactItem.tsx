import React from 'react'
import styles from './ContactItem.module.css'
import editLogo from './edit.svg'
import deleteLogo from './delete.svg'
import {ContactType} from '../../../types/types'
import {useDispatch} from 'react-redux'
import {actions} from '../../../redux/actions'

type PropsType = {
    item: ContactType
}
export const ContactItem: React.FC<PropsType> = ({item}) => {

    const {name, surname, company, address, number} = item

    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <span>{surname}</span>
            <span>{name}</span>
            <span>{company}</span>
            <span>{address}</span>
            <span>{number}</span>
            <span title='Редактировать' className={styles.edit}><img src={editLogo} alt="edit"/></span>
            <span title='Удалить' className={styles.delete} onClick={() => dispatch(actions.removeContact(item))}><img
                src={deleteLogo} alt="delete"/></span>
        </div>
    )
}