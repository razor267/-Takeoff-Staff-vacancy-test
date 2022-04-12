import React, {memo} from 'react'
import styles from './Page404.module.css'

export const Page404: React.FC = memo(() => {

    return (
        <div className={styles.title}>
            Такой страницы не существует
        </div>
    )
})