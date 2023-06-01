import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ListProducts, NotFound, ListCategories } from '@pages'
export default function AppRoutes() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={'/products'} />} />
                <Route path='/products' element={<ListProducts />} />
                <Route path='/categories' element={<ListCategories /> } />
                <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
        </>
    )
}