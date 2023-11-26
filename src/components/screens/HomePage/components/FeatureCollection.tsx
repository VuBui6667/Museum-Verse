import React, { Component, useEffect, useState } from "react";
import CollectionCard from '../../../common/CollectionCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import Slider from "../../../common/Slider/Slider";
import museums from "../../../../api/museums";

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// const FeatureCollection = () => {
//   return (
// <div className="mt-12 px-12 md:px-0">
//   <div className="mb-4">
//     <p className="font-semibold text-2xl text-amber-400">Feature Collections</p>
//   </div>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//         <CollectionCard
//           imgHref='/images/nft-1.jpeg'
//           name='Quả cầu cửu long'
//           quantity={9}
//           volume={10.2}
//         />
//       </div>
//     </div>
//   )
// }

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

const FeatureCollection = () => {
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
    <div className="w-full">
      <div className="mt-12 px-12 md:px-0 w-full">
        <div className="mb-4">
          <p className="font-semibold text-2xl text-amber-400">Feature Collections</p>
        </div>

        <Slider data={listMuseum} />
      </div>
    </div>
  );
}

export default FeatureCollection