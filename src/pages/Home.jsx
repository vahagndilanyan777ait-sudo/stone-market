import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Katalog from '../components/katalog/katalog'
import Ourfriends from '../components/ourfriends/ourfriends'
import Dizain from '../components/dizain/dizain'

export default function Home() {
  return (
    <div>
        <Header/>
        <Katalog/>
        <Ourfriends/>
        <Dizain/>
        <Footer/>
    </div>
  )
}
