import styles from './SearchAndAddContact.module.css'
import React, {ChangeEvent, memo} from 'react'
import cn from 'classnames'
import plusLogo from '../../../img/plus.svg'

type PropsType = {
    searchStr: string
    setSearchStr: (str: string) => void
    visibleAddForm: boolean
    setVisibleAddForm: (arg: boolean) => void
}
export const SearchAndAddContact: React.FC<PropsType> = memo(({searchStr, setSearchStr, setVisibleAddForm, visibleAddForm}) => {
    return (
        <div className={styles.searchAndAddContact}>
            <input className={styles.search}
                   placeholder='Поиск...'
                   value={searchStr}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                       setSearchStr(e.currentTarget.value)
                   }}
            />
            <span className={cn(styles.addContact, {
                [styles.addContactActive]: visibleAddForm
            })} onClick={() => setVisibleAddForm(!visibleAddForm)}>
                    <img src={plusLogo} alt="plus"/>
                    <span className={styles.addContactText}>Добавить контакт</span>
                </span>
        </div>
    )
})