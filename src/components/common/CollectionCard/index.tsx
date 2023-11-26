import React, { useCallback, useRef, memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useBoundStore } from '../../../zustand';
import axios from 'axios';
import { X_API_KEY } from '../../../config/variable';
import { MuseumInput } from '../../../model/api';
import museums, { Museum } from '../../../api/museums';

type Props = {
  publicKey: string
  museum: Museum
}

const CollectionCard = ({ publicKey, museum }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataFetched, setDataFetched] = useState([]);
  const [volume, setVolume] = useState<number>()

  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }));

  const getNFTCollection = async () => {
    setIsLoading(true)
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${publicKey}`;
    axios({
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY,
      },
    })
      .then((res) => {
        console.log(res.data.result);
        setIsLoading(false)
        setDataFetched(res.data.result);
      })
      .catch((err) => {
        setIsLoading(false)
        console.warn(err);
      });
  };

  useEffect(() => {
    if (!isLoading) {
      getNFTCollection()
    }
  }, [])

  return (
    <Link to={`/collection/${museum.id}`}>
      <div className="max-w-lg h-72 border border-gray-400 rounded-lg p-2 drop-shadow-lg cursor-pointer hover:bg-amber-50 transition-all delay-[30ms]">
        <div className="h-[60%] relative">
          <img src={museum.image} alt="Image collection" className="w-full h-full rounded-lg object-cover" />
          <img src={museum.image} alt="" className="absolute rounded-lg w-14 h-14 border-2 border-white -bottom-6 left-6 z-10" />
        </div>
        <div className="flex justify-between mt-12 items-center px-6">
          <div>
            <p className="font-semibold">{museum.name}</p>
            <p className="text-gray-500 font-light">{dataFetched.length} items</p>
          </div>
          <div>
            <p className="font-semibold">Total Volume</p>
            <div className="flex items-center gap-1 justify-end">
              <img src="/icons/solana-icon.png" alt="" className="w-4 h-4" />
              {volume}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(CollectionCard)