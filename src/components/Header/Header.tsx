import React, {memo} from 'react'
import styles from './Header.module.css'
import logoIcon from '../../img/logo.png'
import exitIcon from '../../img/exit.svg'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../types/types'
import {actions} from '../../redux/actions'
import {useNavigate} from 'react-router-dom'

export const Header: React.FC = memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state: StateType) => state.userId)

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        dispatch(actions.logout())
        dispatch(actions.clearContacts())
        navigate('/login')
    }

    return (
        <div className={styles.wrapper}>
            <img src={logoIcon} alt="Logo" className={styles.logo} onClick={() => navigate('/')}/>
            <span className={styles.title} onClick={() => navigate('/')}>Мои контакты</span>
            {userId !== 0 &&
            <span className={styles.exit} onClick={logout}>
                <img src={exitIcon} alt="exit" className={styles.exitIcon}/>
                Выход
            </span>}
        </div>
    )
})