import React from "react";
import { CreateForm } from "./components/CreateForm";
import { useBoundStore } from "../../../zustand";
import ConnectWallet from "../../common/ConnectWallet";

export const CreateNFTScreen = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  return (
    <>
      {
        accountInfo.publicKey ?
          accountInfo.isMuseum ?
            <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28" >
              <p className="flex items-center justify-center font-bold text-xl">Create NFT</p>
              <CreateForm />
            </div>
            : <div className="mt-24 w-[20%] px-8 py-6 border-2 border-red-400 bg-red-200 rounded-lg m-auto font-semibold text-center">
              <p>You dont' have permission to create NFTs</p>
            </div>
          :
          <div className="mt-24 w-[20%] px-8 py-6 border-2 border-black rounded-lg m-auto">
            <p className="text-center mb-2">Please connect your wallet</p>
            <ConnectWallet />
          </div>
      }
    </>
  );
};
