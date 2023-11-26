import React from 'react'
import CustomSearchInput from '../../common/CustomSearchInput'

const Footer = () => {
  return (
    <div>
      <div className="flex gap-12 px-12 lg:px-28 py-12 flex-col md:flex-row">
        <div className="flex-1">
          <p className="font-bold text-3xl mb-8">
            Museum
            <span className="text-amber-400">NFT</span>
          </p>
          <p className="w-[80%]">Trải nghiệm bảo tàng NFTs (non-fungible tokens) đầu tiên tại Việt Nam. MuseumNFT cho phép bạn mua bán, trao đổi các cổ vật, di tích dưới dạng NFT. Qua đó góp phần gìn giữ và phát triển các bảo tàng tại Việt Nam.</p>
        </div>
        <div className="flex-1 flex gap-20">
          <div>
            <p className="font-semibold mb-4">Explore</p>
            <p className="cursor-pointer hover:opacity-80">All collections</p>
          </div>
          <div>
            <p className="font-semibold mb-4">Partners</p>
            <p className="cursor-pointer hover:opacity-80">Contact us</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 flex justify-between px-12 lg:px-28 py-12 flex-col md:flex-row gap-4">
        <div>All rights reserved 2023 ©</div>
        <div className="flex text-amber-400 gap-8">
          <p className="cursor-pointer hover:opacity-80">Term & Conditions</p>
          <p className="cursor-pointer hover:opacity-80">Privacy policy</p>
          <p className="cursor-pointer hover:opacity-80">Cookie policy</p>
        </div>
      </div>
    </div>
  )
}

export default Footer