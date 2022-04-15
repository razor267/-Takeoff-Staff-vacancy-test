import React from 'react'
import styles from './App.module.css'
import {Header} from '../../components/Header/Header'
import {Content} from '../../components/Content/Content'
import {Login} from '../Login/Login'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {Page404} from '../404/Page404'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/actions'
import {StateType} from '../../types/types'
import {Registration} from '../Registration/Registration'
import {InaccessiblePage} from '../InaccessiblePage/InaccessiblePage'

function App() {

    const dispatch = useDispatch()

    const userId = useSelector((state: StateType) => state.userId)

    const idLocalStorage = Number(localStorage.getItem('id'))

    if (idLocalStorage !== 0) {
        dispatch(actions.login(idLocalStorage))
    }

    let location = useLocation()
    let userURL = Number(location.pathname.substring(1))

    return (
        <div className={styles.appWrapper}>
            <Header/>
            <Routes>
                <Route path='/' element={userId ? <Navigate to={`/${userId}`}/> : <Navigate to={'/login'}/>}/>
                <Route path='/:userId' element={userId ?
                    (userId === userURL ? <Content/> : <Navigate to={'/access'}/>) :
                    <Navigate to={'/login'}/>}/>
                <Route path='/login' element={userId ? <Navigate to={'/'}/> : <Login/>}/>
                <Route path='/reg' element={userId ? <Navigate to={'/'}/> : <Registration/>}/>
                <Route path='/access' element={userId ? <InaccessiblePage/> : <Navigate to={'/login'}/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </div>
    )
}

export default App