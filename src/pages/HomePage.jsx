import React from 'react'
import Navigationpage from '../components/Navigationpage'
import HomeCard from '../components/HomeCard'
import PostFilterCategory from '../components/Postfiltercategory'

const HomePage = () => {
  return (
   <>

   <Navigationpage></Navigationpage>
   <HomeCard></HomeCard>
   <PostFilterCategory/>

   </>
  )
}

export default HomePage
