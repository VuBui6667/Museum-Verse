import React, { useEffect, useId, useState } from 'react'
import CollectionCard from '../../../common/CollectionCard'
import Slider from '../../../common/Slider/Slider'
import museums from '../../../../api/museums'

let data = [
  {
    imgHref: "/images/nft-1.jpeg",
    name: "1",
    quantity: 1,
    volume: 2.5,
  },
  {
    imgHref: "/images/nft-1.jpeg",
    name: "2",
    quantity: 2,
    volume: 2.5,
  },
  {
    imgHref: "/images/nft-1.jpeg",
    name: "3",
    quantity: 3,
    volume: 2.5,
  },
  {
    imgHref: "/images/nft-1.jpeg",
    name: "4",
    quantity: 4,
    volume: 2.5,
  },
  {
    imgHref: "/images/nft-1.jpeg",
    name: "5",
    quantity: 5,
    volume: 2.5,
  }
]

const HighestVolumeCollection = () => {
  const [listMuseum, setListMuseum] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const handleFetchAllMuseum = async () => {
      try {
        setIsLoading(true)
        const response = await museums.getAll()
        setListMuseum(Object.values(response))
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    handleFetchAllMuseum()
  }, [])
  return (
    <div className="my-12 px-12 md:px-0">
      <div className="mb-4">
        <p className="font-semibold text-2xl text-amber-400">Highest Volumn Collections</p>
      </div>
      <Slider data={listMuseum} />
    </div>
  )
}

export default HighestVolumeCollection