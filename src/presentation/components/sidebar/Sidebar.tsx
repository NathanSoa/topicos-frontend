import { List, Rocket } from 'phosphor-react'

import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <h1>
                <Rocket />
                My Company
            </h1>
            <NavLink to='/products' title='Products'>
                <div className={`${styles.content}`}>
                    <List weight='bold' /> Products
                </div>
            </NavLink>
            <NavLink to='/categories' title='Categories'>
                <div className={styles.content}>
                    <List weight='bold' /> Category
                </div>
            </NavLink>
        </aside>
    )
}``