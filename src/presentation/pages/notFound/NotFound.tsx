import styles from './NotFound.module.css'

export function NotFound() {
    return (
        <main className={styles.content}>
            <h1>404</h1>
            <span>The page you searched doesn't exist</span>
        </main>
    )
}