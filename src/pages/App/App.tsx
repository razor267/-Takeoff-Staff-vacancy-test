import React from 'react'
import styles from './App.module.css'
import {Header} from '../../components/Header/Header'
import {Content} from '../../components/Content/Content'

function App() {
    return (
        <div className={styles.appWrapper}>
            <Header/>
            <Content/>
        </div>
    )
}

export default App
