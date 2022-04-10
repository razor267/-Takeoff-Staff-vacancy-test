import React from 'react'
import styles from './ContactItem.module.css'
import editLogo from '../../../img/edit.svg'
import deleteLogo from '../../../img/delete.svg'
import {ContactType} from '../../../types/types'
import {useDispatch} from 'react-redux'
import {actions} from '../../../redux/actions'
import {highLightText} from '../../../utils/highLightText/highLightText'

type PropsType = {
    item: ContactType
    highLight?: string
}
export const ContactItem: React.FC<PropsType> = ({item, highLight}) => {

    const {name, surname, company, address, number} = item

    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <span>{highLight ? highLightText(highLight, surname) : surname}</span>
            <span>{highLight ? highLightText(highLight, name) : name}</span>
            <span>{highLight ? highLightText(highLight, company) : company}</span>
            <span>{highLight ? highLightText(highLight, address) : address}</span>
            <span>{highLight ? highLightText(highLight, number.toString()) : number}</span>
            <span title='Редактировать' className={styles.edit}><img src={editLogo} alt="edit"/></span>
            <span title='Удалить' className={styles.delete} onClick={() => dispatch(actions.removeContact(item))}><img
                src={deleteLogo} alt="delete"/></span>
        </div>
    )
}