import React from 'react'
import styles from './App.module.css'
import {Header} from '../../components/Header/Header'
import {Content} from '../../components/Content/Content'
import {Login} from '../Login/Login'
import {Route, Routes} from 'react-router-dom'

function App() {
    return (
            <div className={styles.appWrapper}>
                <Header/>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/' element={<Content/>}/>
                </Routes>
            </div>
    )
}

export default App
