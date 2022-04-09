import React from 'react'
import styles from './Content.module.css'
import plusLogo from './plus.svg'
import {contacts} from '../../db'
import {ContactItem} from './ContactItem/ContactItem'

export const Content: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.addContact}>
                <img src={plusLogo} alt="plus"/>
                Добавить контакт
            </div>
            <div className={styles.header}>
                <span>Фамилия</span>
                <span>Имя</span>
                <span>Компания</span>
                <span>Адрес</span>
                <span>Телефон</span>
            </div>
            {contacts.map(item => <ContactItem item={item} key={item.id}/>)}
        </div>
    )
}