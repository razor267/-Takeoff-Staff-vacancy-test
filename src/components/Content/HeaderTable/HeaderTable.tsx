import styles from './HeaderTable.module.css'
import React from 'react'

type PropsType = {
}
export const HeaderTable: React.FC<PropsType> = () => {
    return (
        <div className={styles.headerTable}>
            <span>Фамилия</span>
            <span>Имя</span>
            <span>Компания</span>
            <span>Адрес</span>
            <span>Телефон</span>
        </div>
    )
}