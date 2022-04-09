import React from 'react'
import styles from './ContactItem.module.css'
import {ContactType} from '../../../db'
import editLogo from './edit.svg'
import deleteLogo from './delete.svg'

type PropsType = {
    item: ContactType
}
export const ContactItem: React.FC<PropsType> = ({item}) => {

    const {name, surname, company, address, number} = item

    return (
        <div className={styles.wrapper}>
            <span className={styles.name}>{name}</span>
            <span>{surname}</span>
            <span>{company}</span>
            <span>{address}</span>
            <span>{number}</span>
            <span title='Редактировать' className={styles.edit}><img src={editLogo} alt="edit"/></span>
            <span title='Удалить' className={styles.delete}><img src={deleteLogo} alt="delete"/></span>
        </div>
    )
}