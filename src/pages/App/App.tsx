import React from 'react'
import styles from './App.module.css'
import {Header} from '../../components/Header/Header'
import {Content} from '../../components/Content/Content'
import {Login} from '../Login/Login'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Page404} from '../404/Page404'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../types/types'
import {actions} from '../../redux/actions'

function App() {

    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    const isAuth = useSelector((state: StateType) => state.isAuth)

    if (token) {
        dispatch(actions.login(true))
    }

    return (
        <div className={styles.appWrapper}>
            <Header/>
            <Routes>
                <Route path='/' element={isAuth ? <Content/> : <Navigate to={'/login'}/>}/>
                <Route path='/login' element={isAuth ? <Navigate to={'/'}/> : <Login/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </div>
    )
}

export default App