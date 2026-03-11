import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Shop from '../components/shop/shop'
import Card from '../components/shop/card'

export default function ShopPage() {
  return (
    <div>
        <Header/>
        <Shop/>
        <Card/>
        <Footer/>
    </div>
  )
}
