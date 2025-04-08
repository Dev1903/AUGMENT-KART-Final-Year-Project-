import React from 'react'
import './App.css'

import Header from './components/Header'
import Offer from './components/Offer'
import Category from './components/Category'
import ProductCard from './components/ProductCard'
import BestSeller from './components/BestSeller'

function App() {

  return (
    <div className="App container-fluid">
      <div className="row header pb-5">
        <Header />
      </div>
      <div className="row offer pt-5 pb-5">
        <Offer />
      </div>
      <div className="row offer pt-5 pb-5">
        <Category />
      </div>
      <div className="row bestseller pt-5 pb-5">
        <BestSeller />
      </div>
    </div>
  )
}

export default App;
