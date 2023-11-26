import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import museums, { Museum } from '../../../api/museums';
import axios from 'axios';
import { MARKETPLACE_ADDRESS, X_API_KEY } from '../../../config/variable';
import NFTCard from '../../common/NFTCard';

const CollectionDetail = () => {
  const { id } = useParams()
  const [museum, setMuseum] = useState<Museum>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listNFT, setListNFT] = useState<any[]>([])

  const fetchMuseumByPublicKey = async () => {
    try {
      const response = await museums.getById(id ?? '')
      setMuseum(Object.values(response)[0])
    } catch (error) {
      console.log(error);
    }
  };

  const getNFTCollection = async () => {
    setIsLoading(true)
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${museum?.publicKey}`;
    axios({
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
    })
      .then((res) => {
        setListNFT(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.warn(err);
      });
  };

  useEffect(() => {
    fetchMuseumByPublicKey()
  }, [])

  useEffect(() => {
    if (museum?.publicKey && !isLoading) {
      getNFTCollection()
    }
  }, [museum])

  console.log(listNFT)

  return (
    <>
      {museum &&
        <div className="min-h-screen bg-[#f4f5f6] mt-12 mb-12">
          <div className="relative shadow-lg mb-24">
            <img src={museum.image} alt="" className="w-full h-96 object-cover" />
            <img src={museum.image} alt="" className="w-40 h-40 absolute bottom-[-70px] left-[70px] border-8 border-white rounded-xl" />
          </div>
          <div className="px-20">
            <p className="text-4xl font-semibold text-amber-500 mb-2">{museum.name}</p>
            <p className="text-gray-500">Số lượng <span className="font-semibold">{listNFT.length ? listNFT.length + 1 : 0}</span></p>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {listNFT.map(nft => (
                <Link to={`/nft/detail/${nft.mint}/2/${nft.update_authority}`}>
                  <NFTCard
                    imgHref={nft.image_uri}
                    name={nft.name}
                    symbol={nft.symbol}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default CollectionDetail