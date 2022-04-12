import React, {memo} from 'react'
import styles from './Header.module.css'
import logoIcon from '../../img/logo.png'
import exitIcon from '../../img/exit.svg'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../types/types'
import {actions} from '../../redux/actions'
import {useNavigate} from 'react-router-dom'

export const Header:React.FC = memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector((state: StateType) => state.isAuth)

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(actions.logout(false))
        navigate('/login')
    }

    return (
        <div className={styles.wrapper}>
            <img src={logoIcon} alt="Logo" className={styles.logo}/>
            <span className={styles.title}>Мои контакты</span>
            {isAuth && <span className={styles.exit} onClick={logout}><img src={exitIcon} alt="exit" className={styles.exitIcon}/>Выход</span>}
        </div>
    )
})