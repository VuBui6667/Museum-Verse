import React from 'react'
import Information from './components/Information'
import TrendingCollections from './components/TrendingCollections'
import FeatureCollection from './components/FeatureCollection'
import HighestVolumeCollection from './components/HighestVolumeCollection'

const HomePageScreen = () => {
  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28 w-screen">
      <Information />
      <TrendingCollections />
      <FeatureCollection />
      <HighestVolumeCollection />
    </div>
  )
}

export default HomePageScreen