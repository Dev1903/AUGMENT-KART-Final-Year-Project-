import React from 'react'
import './App.css'

import Header from './components/Header'
import Offer from './components/Offer'
import Category from './components/Category'
import ProductCard from './components/ProductCard'
import BestSeller from './components/BestSeller'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App container-fluid">
      <div className="row header">
        <Header />
      </div>
      <div className="row offer pt-3 pb-5">
        <Offer />
      </div>
      <div className="row category pt-5 pb-5">
        <Category />
      </div>
      <div className="row bestseller pt-5 pb-5">
        <BestSeller />
      </div>
      <div className="row footer pt-5">
        <Footer />
      </div>
    </div>
  )
}

export default App;
