import { useState } from 'react'
import { BrowserRouter } from 'react-router'
import './App.css'
import RouteList from './Routes/RouteList'

function App() {


  return (
    <>
      <BrowserRouter>
          <RouteList/>

      </BrowserRouter>
    </>
  )
}

export default App
