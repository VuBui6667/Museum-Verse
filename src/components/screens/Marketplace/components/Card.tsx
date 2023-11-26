import axios from "axios";
import { MARKETPLACE_ADDRESS, X_API_KEY } from "../../../../config/variable";
import { useBoundStore } from "../../../../zustand";
import { signAndConfirmTransactionFe } from "../../../../utils/utilityfunc";
import { NOTIFICATION_TYPE, notify } from "../../../../utils/notify";
import { error } from "console";
import CustomButton from "../../../common/CustomButton";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }));

  const callback = (signature: any, result: any) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      notify(NOTIFICATION_TYPE.SUCCESS, " Mua NFT thành công");
    }
  };

  const onBuyNft = async () => {
    const buyNftUrl = "https://api.shyft.to/sol/v1/marketplace/buy";
    const network = "devnet";

    const buyNftData = {
      network: "devnet",
      marketplace_address: MARKETPLACE_ADDRESS,
      nft_address: data.nft_address,
      price: data.price,
      seller_address: data.seller_address,
      buyer_wallet: accountInfo.publicKey,
    };

    await axios
      .post(buyNftUrl, buyNftData, {
        headers: {
          "x-api-key": X_API_KEY,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        console.log(response);
        const transaction = response.data.result.encoded_transaction;
        await signAndConfirmTransactionFe(network, transaction, callback);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(buyNftData);
  };

  const navigateToDetail = () => {
    navigate(
      `/nft/detail/${data.nft_address}/${data.price}/${data.seller_address}`,
      {
        state: {
          nftAddress: data.nft_address,
          price: data.price,
          seller: data.seller_address,
        },
      }
    );
  };

  return (
    <div className="max-w-lg h-80 border border-gray-400 rounded-lg p-2 drop-shadow-lg cursor-pointer hover:bg-amber-50 transition-all delay-[30ms]">
      <img
        src={data.nft.cached_image_uri}
        className="h-56 w-full"
        onClick={navigateToDetail}
      />
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="font-bold text-lg">{data.nft.name}</p>
          <div className="">{data.nft.description}</div>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <img src="/icons/solana-icon.png" alt="" className="w-4 h-4" />
            <div className="ml-2">{data.price}</div>
          </div>
          <CustomButton
            label="Buy"
            customClassName="px-4 py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms]"
            onClick={onBuyNft}
          />
        </div>
      </div>
    </div>
  );
};
