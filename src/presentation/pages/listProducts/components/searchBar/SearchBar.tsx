import { useState } from 'react'
import styles from './SearchBar.module.css'

interface Properties {
    filterProducts: (search: string) => void
}

export function SearchBar({filterProducts}: Properties) {

    const [search, setSearch] = useState<string>('')

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        filterProducts(search)
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    name="search" 
                    placeholder='Search Products by name' 
                    className={styles.searchInput}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <input 
                    type="submit" 
                    value="Pesquisar" 
                    className={styles.button} 
                />
            </form>
        </>
    )
}