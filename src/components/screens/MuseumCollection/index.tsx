import axios from "axios";
import { Card } from "./components/Card";
import { useBoundStore } from "../../../zustand";
import { X_API_KEY } from "../../../config/variable";
import { useEffect, useState } from "react";
import { signAndConfirmTransactionFe } from "../../../utils/utilityfunc";
import { NOTIFICATION_TYPE, notify } from "../../../utils/notify";
import CustomButton from "../../common/CustomButton";
import ConnectWallet from "../../common/ConnectWallet";
import SpinnerLoading from "../../common/SpinnerLoading";

export const MuseumCollectionScreen = () => {
  const { accountInfo, setWebAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    setWebAccountInfo: store.saveWebAccountInfo,
  }));
  const [dataFetched, setDataFetched] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getNFTCollection = async () => {
    console.log(accountInfo);

    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${accountInfo.publicKey}`;
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

  const callback = (signature: any, result: any) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      notify(NOTIFICATION_TYPE.SUCCESS, "Create market place successfully!");
    }
  };

  const onCreateMarketplace = async () => {
    const createMarketUrl = "https://api.shyft.to/sol/v1/marketplace/create";
    const createData = {
      network: "devnet",
      transaction_fee: 1,
      creator_wallet: accountInfo.publicKey,
    };

    await axios
      .post(createMarketUrl, createData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": X_API_KEY,
        },
      })
      .then(async (response) => {
        console.log("response: ", response.data.result);
        let network = "devnet";
        const transaction = response.data.result.encoded_transaction;
        const ret_result = await signAndConfirmTransactionFe(
          network,
          transaction,
          callback
        );
      });
  };

  useEffect(() => {
    if (accountInfo.publicKey.length !== 0) {
      getNFTCollection();
    }
  }, [accountInfo]);

  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28">
      <p className="text-amber-400 font-semibold text-3xl mb-8">Your Collection</p>
      {!accountInfo.publicKey ?
        <div className="mt-24 w-[20%] px-8 py-6 border-2 border-black rounded-lg m-auto">
          <p className="text-center mb-2">Please connect your wallet</p>
          <ConnectWallet />
        </div>
        :
        !accountInfo.isMuseum ?
          <div>
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-800" role="alert">
              <span className="font-medium">Musuem Only!</span> You don't have permission to access this page.
            </div>
            <p className="text-sm font-normal text-gray-400">Nếu bạn thuộc phía bảo tàng hãy liên hệ với chúng tôi!</p>
          </div> :
          isLoading ?
            <div className="flex justify-center">
              <SpinnerLoading size={12} />
            </div>
            :
            <div className="grid grid-cols-4 justify-center gap-8">
              {dataFetched
                ? dataFetched.map((element, index) => (
                  <Card data={element} accountInfo={accountInfo} setWebAccountInfo={setWebAccountInfo} />
                ))
                : null}
            </div>
      }
    </div>
  );
};
