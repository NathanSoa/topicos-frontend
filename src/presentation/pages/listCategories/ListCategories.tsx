import { Sidebar } from '@components'
import styles from './ListCategories.module.css'
import { Plus } from 'phosphor-react'
import { Table } from './components/table/Table'
import { Category } from '@domain/category/entities/category.entity'
import { useEffect, useState } from 'react'
import { getCategoryUseCases } from '@main/factories/CategoryUseCasesFactory'
export function ListCategories() {

    const [categories, setCategories] = useState<Category[]>([])

    const findAll = getCategoryUseCases()
    const updateState = (newCategory: Category) => setCategories([newCategory, ...categories])
    const removeFromState = (id: number) => setCategories([...categories.filter(each => each.id !== id)])


    const displayedCategories = categories

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await findAll()
                setCategories(result)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <main>
                <span>Categories</span>
                <a
                    href='#'
                    className={styles.addButton}
                >
                    <Plus size={16} weight="bold" />
                    NEW CATEGORY
                </a>
                <Table content={displayedCategories} removeFromState={removeFromState} />
            </main>
        </div>
    )
}