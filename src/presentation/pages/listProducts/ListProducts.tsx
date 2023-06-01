import { Sidebar }from '@components'
import { SearchBar } from './components/searchBar/SearchBar'
import { Table } from './components/table/Table'

import { Product } from '@domain/product/entities/product.entity'

import { useEffect, useState } from 'react'

import { Plus } from 'phosphor-react'

import styles from './ListProducts.module.css'
import { CreateProductModal } from './components/createProduct/CreateProductModal'
import { getProductUseCases } from '@main/factories/ProductUseCasesFactory'
import { Category } from '@domain/category/entities/category.entity'
import { getCategoryUseCases } from '@main/factories/CategoryUseCasesFactory'

export function ListProducts() {

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)

    const findAllProducts = getProductUseCases()
    const findAllCategories = getCategoryUseCases()
    const closeModal = () => setShowModal(false)
    const updateState = (newProduct: Product) => setProducts([newProduct, ...products])
    const removeFromState = (id: string) => setProducts([...products.filter(each => each.id !== id)])


    let displayedProducts = products

    const filterDisplayedProducts = (search: string) => {
        const filtered = products.filter(each => each.name.toLowerCase().includes(search.toLowerCase()))
        displayedProducts = filtered
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProducts(await findAllProducts())
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCategories(await findAllCategories())
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault()
        setShowModal(true)
    }


    function handleUpdate(updatedProduct: Product): void {
        setProducts(prevProducts =>
            prevProducts.map(product => {
              if (product.id === updatedProduct.id) {
                return {
                  ...product,
                  ...updatedProduct
                };
              }
              return product;
            })
          );
      }

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <main>
                <SearchBar filterProducts={filterDisplayedProducts} />
                <span>Products</span>
                <a
                    href='#'
                    onClick={handleClick}
                    className={styles.addButton}
                >
                    <Plus size={16} weight="bold" />
                    NEW PRODUCT
                </a>
                {
                    showModal ? <CreateProductModal closeModal={closeModal} updateState={updateState} categories={categories} /> : <></>
                }
                <Table content={displayedProducts} removeFromState={removeFromState} handleUpdate={handleUpdate}/>
            </main>
        </div>
    )
}