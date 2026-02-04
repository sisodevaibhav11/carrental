import React, { useState } from 'react'
import NavBar from './components/Navbar.jsx'
import { useLocation, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cars from './pages/Cars.jsx'
import CarDetails from './pages/CarDetails.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Footer from './components/Footer.jsx'
import Layout from './pages/owner/Layout.jsx'
import Dashboard from './pages/owner/Dashboard.jsx'
import AddCar from './pages/owner/AddCar.jsx'
import ManageCars from './pages/owner/ManageCars.jsx'
import ManageBookings from './pages/owner/ManageBookings.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  return (
    <>
      {!isOwnerPath && <NavBar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/owner' element={<Layout />} >  
          <Route index element={<Dashboard  />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer/>}
    </>
  )
}

export default App
