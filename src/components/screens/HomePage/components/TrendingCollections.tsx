import React from 'react'
import CollectionTicket from '../../../common/CollectionTicket'

const TrendingCollections = () => {
  return (
    <div className="mt-12 px-12 md:px-0">
      <div className="mb-4">
        <p className="font-semibold text-2xl text-amber-400">Trending Collections</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          (new Array(6)).fill(0).map(_ => (
            <CollectionTicket
              index={1}
              imgHref='https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2Fhttps%3A%2F%2Farweave.net%2FN8chsQjXlVAiL0zWpkIkM_7U3pE9IacyQ-U17v1OiKc%3Fext%3Dpng&w=3840&q=75'
              name='Ted_NFT'
              floor={1.3}
              vol={736.29}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TrendingCollections