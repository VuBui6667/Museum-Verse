import React from 'react'

const Information = () => {
  return (
    <div className="relative h-[1060px] sm:h-[1000px] md:h-[960px] lg:h-full">
      <img src="/images/vietnam-museum.jpeg" alt="" className="md:rounded-3xl h-full object-cover" />
      <div className="backdrop-blur-md bg-black/30 h-full w-full absolute top-0 bottom-0 left-0 right-0 md:rounded-3xl flex p-8 xl:p-16 gap-12 xl:gap-16 flex-col lg:flex-row">
        <div className="w-[80%] lg:w-[55%] xl-w-[60%]">
          <p className="text-6xl lg:text-[72px] font-bold text-amber-400 leading-tight">Explore NFTs with Vietnam Museum</p>
          <p className="text-amber-400 mt-4">Buy or sell NFTs and explore Vietnam Museum. You will contribute to the conservation and maintenance of Vietnam Museum</p>
          <div className="flex gap-4 mt-8">
            <div className="bg-amber-400 text-black px-4 py-2 rounded-md flex-1/2 cursor-pointer hover:scale-110 transition-all delay-75">Explore collections</div>
            <div className="border border-amber-400 text-amber-400 px-4 py-2 rounded-md flex-1/2 cursor-pointer hover:bg-amber-400 hover:text-black transition-all delay-[30ms]">Sell my NFTs</div>
          </div>
        </div>
        <div className="w-[360px] lg:w-[45%] xl:w-[40%]">
          <div className="w-full h-full border border-amber-400 rounded-xl flex p-4 flex-col cursor-pointer">
            <img src="/images/nft-1.jpeg" alt="" className="w-full h-[80%] object-cover rounded-xl" />
            <p className="text-amber-300 text-xl mt-4">Quả cầu cửu long</p>
            <div className="flex justify-between">
              <p className="text-white text-md">Quả cầu cửu long #1</p>
              <div className="flex gap-1 items-center">
                <img src="/icons/solana-icon.png" alt="" className="w-5 h-5" />
                <span className="font-semibold text-white">0.87</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information