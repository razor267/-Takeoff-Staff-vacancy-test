import React from 'react'
import styles from './RadialWhiteDiv.module.css'
import editLogo from '../../img/edit.svg'
import deleteLogo from '../../img/delete.svg'
import saveLogo from '../../img/save.svg'
import cancelLogo from '../../img/cancel.svg'
import {ContactType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {highLightText} from '../../utils/highLightText/highLightText'
import {actions} from '../../redux/actions'
import cn from 'classnames'


type PropsType = {
    item?: ContactType
    highLight?: string
    type: 'contactItem' | 'addForm' | 'editForm'
    closeForm?: () => void
}
export const RadialWhiteDiv: React.FC<PropsType> = ({item, highLight, type, closeForm}) => {

    const dispatch = useDispatch()

    switch (type) {
        case 'contactItem':
            if (item) {
                const {name, surname, company, address, number} = item
                return (
                    <div className={styles.wrapper}>
                        <span>{highLight ? highLightText(highLight, surname) : surname}</span>
                        <span>{highLight ? highLightText(highLight, name) : name}</span>
                        <span>{highLight ? highLightText(highLight, company) : company}</span>
                        <span>{highLight ? highLightText(highLight, address) : address}</span>
                        <span>{highLight ? highLightText(highLight, number.toString()) : number}</span>
                        <span title='Редактировать' className={styles.edit}><img src={editLogo} alt="edit"/></span>
                        <span title='Удалить' className={styles.delete}
                              onClick={() => dispatch(actions.removeContact(item))}><img
                            src={deleteLogo} alt="delete"/></span>
                    </div>
                )
            } else return <></>
        case 'addForm':
            return (
                <div className={cn(styles.wrapper, styles.wrapperActive)}>
                    <input/>
                    <input/>
                    <input/>
                    <input/>
                    <input/>
                    <span title='Сохранить' className={styles.save}><img src={saveLogo} alt="save"/></span>
                    <span
                        title='Отмена'
                        className={styles.cancel}
                        onClick={closeForm}
                    ><img src={cancelLogo} alt="cancel"/></span>
                </div>
            )
        default:
            return <></>
    }
}