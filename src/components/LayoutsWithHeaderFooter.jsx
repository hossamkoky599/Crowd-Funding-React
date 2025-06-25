import React from 'react'
import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from 'react-router'
function LayoutsWithHeaderFooter() {
  return (
    <div>
        <Header/>
            <div className="container mt-4">
                  <Outlet/>
            </div>
        <Footer/>
    </div>
  )
}

export default LayoutsWithHeaderFooter