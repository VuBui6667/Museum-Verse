import { ChangeEvent, useState } from "react";
import { WebAccountInfo } from "../../../../model/common";
import axios from "axios";
import { MARKETPLACE_ADDRESS, X_API_KEY } from "../../../../config/variable";
import { signAndConfirmTransactionFe } from "../../../../utils/utilityfunc";
import CustomButton from "../../../common/CustomButton";
import CustomInput from "../../../common/CustomInput";
import { NOTIFICATION_TYPE, notify } from "../../../../utils/notify";

export const Card = ({
  data,
  accountInfo,
  setWebAccountInfo,
}: {
  data: any;
  accountInfo: WebAccountInfo;
  setWebAccountInfo: (data: WebAccountInfo) => void
}) => {
  const [isSell, setIsSell] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const onList = async () => {
    setIsSell(true);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgError, setMsgError] = useState<string>('')

  const callback = (signature: any, result: any) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    if (signature.err === null) {
      setIsLoading(false)
      notify(NOTIFICATION_TYPE.SUCCESS, 'Listed successfully!')
    } else {
      notify(NOTIFICATION_TYPE.ERROR, 'Cannot listing this nft!')
      setIsLoading(false)
    }
  };

  const onSell = async () => {
    if (!price) {
      setMsgError('Please enter price!')
    } else {
      setIsLoading(true)
      const sellNftUrl = "https://api.shyft.to/sol/v1/marketplace/list";

      const sellData = {
        network: "devnet",
        nft_address: data.mint,
        marketplace_address: MARKETPLACE_ADDRESS,
        price: Number(price),
        seller_wallet: accountInfo.publicKey,
      };
      await axios
        .post(sellNftUrl, sellData, {
          headers: {
            "x-api-key": X_API_KEY,
          },
        })
        .then(async (response) => {
          console.log(response.data.result);
          let network = "devnet";
          const transaction = response.data.result.encoded_transaction;
          try {
            const ret_result = await signAndConfirmTransactionFe(
              network,
              transaction,
              callback
            )
          } catch (error) {
            setIsLoading(false)
            console.log(error);
          }
        });
    }
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  return (
    <div className="border border-gray-300 rounded-xl shadow-lg bg-[#f4f5f6] pb-4 hover:bg-amber-50 border hover:border-amber-200">
      <img src={data.image_uri} alt="" className="border-b border-gray-300 h-72 w-full object-cover rounded-t-xl" />
      <p className="text-amber-500 font-semibold text-lg px-4 mb-2">{data.name}</p>
      {!isSell &&
        <div className="px-4">
          <CustomButton label="List" onClick={onList} />
        </div>
      }
      {isSell &&
        <div className="flex gap-2 px-2">
          <CustomInput placeholder={`${!msgError ? 'Enter price' : msgError}`} onChange={handleChangePrice} isDisable={isLoading} isError={!!msgError} />
          <CustomButton onClick={onSell} label="Accept" customClassName="w-[30%]" isLoading={isLoading} isDisable={isLoading} />
        </div>
      }
    </div>
  );
};
