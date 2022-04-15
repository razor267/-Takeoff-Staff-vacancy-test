import React, {memo} from 'react'
import styles from './InaccessiblePage.module.css'

export const InaccessiblePage: React.FC = memo(() => {

    return (
        <div className={styles.title}>
            Доступ к контактам другого пользователя ограничен
        </div>
    )
})