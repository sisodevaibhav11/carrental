import React from 'react'
import Hero from '../components/Hero.jsx'
import FeaturedSection from '../components/FeaturedSection.jsx'
import Banner from '../components/Banner.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Newsletter from '../components/Newsletter.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection/>
      <Banner />
      <Testimonial/>
      <Newsletter/>
    </div>
  )
}

export default Home
