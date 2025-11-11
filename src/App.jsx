import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout/Layout'

import Home from './pages/Home/Home'
import Calculator from './pages/Calculator/Calculator'
import Animation from './pages/Animation/Animation'
import Components from './pages/Components/Components'
import Todos from './pages/Todos/Todos'
import Products from './pages/Products/Products'
import Carts from './pages/Carts/Carts'
import { fetchProducts } from './data/products'
import Login from './pages/Login/Login' 

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './App.css'


//Hasrouter , BrowserRouter, MemoryRouter

function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])
  const [tab, setTab] = useState('home')

  useEffect(() => {
    setProducts(fetchProducts())
  }, [])

  if (token === '') {
    return (<Login setToken={setToken} setRole={setRole} />) 
  } else {

    return (
      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} products={products} carts={carts} setToken={setToken} />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/calculator' element={<Calculator />} />
              <Route path='/animation' element={<Animation />} />
              <Route path='/components' element={<Components />} />
              <Route path='/todos' element={<Todos />} />
              <Route path='/products' element={<Products products={products} carts={carts} setCarts={setCarts} />} />
              <Route path='/carts' element={<Carts carts={carts} setCarts={setCarts} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div >
    )
  }

}

export default App


