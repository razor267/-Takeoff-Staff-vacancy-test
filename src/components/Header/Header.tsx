import React, {memo} from 'react'
import styles from './Header.module.css'
import logoIcon from '../../img/logo.png'

export const Header:React.FC = memo(() => {
    return (
        <div className={styles.wrapper}>
            <img src={logoIcon} alt="Logo" className={styles.logo}/>
            <span className={styles.title}>Мои контакты</span>
        </div>
    )
})