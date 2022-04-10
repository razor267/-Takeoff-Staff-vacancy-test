import React from 'react'
import styles from './highLightText.module.css'

//подсвечиваем поисковый запрос в результатах поиска
export const highLightText = (filter: string, str: string): string | (string | JSX.Element)[] => {
    if (!filter) return str
    const regexp = new RegExp(filter, 'ig')
    const matchValue = str.match(regexp)
    if (matchValue) {
        return str.split(regexp).map((s, index, array) => {
            if (index < array.length - 1) {
                const c = matchValue.shift()
                return <span key={index}>{s}<span className={styles.highLight}>{c}</span></span>
            }
            return s
        })
    }
    return str
}