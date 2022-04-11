import styles from './HeaderTable.module.css'
import React, {memo} from 'react'

type PropsType = {
}
export const HeaderTable: React.FC<PropsType> = memo(() => {
    return (
        <div className={styles.headerTable}>
            <span>Фамилия</span>
            <span>Имя</span>
            <span>Компания</span>
            <span>Адрес</span>
            <span>Телефон</span>
        </div>
    )
})