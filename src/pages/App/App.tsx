import React from 'react'
import styles from './App.module.css'
import {Header} from '../../components/Header/Header'
import {Content} from '../../components/Content/Content'
import {Login} from '../Login/Login'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Page404} from '../404/Page404'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {StateType} from '../../types/types'
import {Registration} from '../Registration/Registration'

function App() {

    const dispatch = useDispatch()

    const userId = useSelector((state: StateType) => state.userId)

    const idLocalStorage = Number(localStorage.getItem('id'))

    if (idLocalStorage!== 0) {
        dispatch(actions.login(idLocalStorage))
    }

    return (
        <div className={styles.appWrapper}>
            <Header/>
            <Routes>
                <Route path='/' element={userId ? <Content/> : <Navigate to={'/login'}/>}/>
                <Route path='/login' element={userId ? <Navigate to={'/'}/> : <Login/>}/>
                <Route path='/reg' element={userId ? <Navigate to={'/'}/> : <Registration/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </div>
    )
}

export default App