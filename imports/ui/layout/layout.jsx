import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function Layout({children}) {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <Content>
        {children}
      </Content>
      <Footer></Footer>
    </>
  )
}

export default Layout