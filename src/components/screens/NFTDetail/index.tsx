import React, { useEffect, useState } from "react";
import CustomButton from "../../common/CustomButton";
import DropdownContainer from "../../common/DropdownContainer";
import { SETTINGS_ONE_ROW } from "../../../constants";
import NFTCard from "../../common/NFTCard";
import Slider from "../../common/Slider/Slider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MARKETPLACE_ADDRESS, X_API_KEY } from "../../../config/variable";
import { useBoundStore } from "../../../zustand";
import { signAndConfirmTransactionFe } from "../../../utils/utilityfunc";
import { NOTIFICATION_TYPE, notify } from "../../../utils/notify";

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
  },
];

const NFTDetailScreen = () => {
  const [nftDetail, setNftDetail] = useState<any>();
  const { nftAddress, price, seller } = useParams();
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
      nft_address: nftAddress,
      price: Number(price),
      seller_address: seller,
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

  const getNftDetail = async () => {
    await axios
      .get(
        `https://api.shyft.to/sol/v1/nft/read?network=devnet&token_address=${nftAddress}`,
        {
          headers: {
            "x-api-key": X_API_KEY,
          },
        }
      )
      .then((response) => {
        setNftDetail(response.data.result);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getNftDetail();
  }, []);
  return (
    <div className="mt-24 px-36">
      {nftDetail ? (
        <div className="flex">
          <div className="flex-1">
            {nftAddress === "FfgeTwPfoqkYonj4ZsSqF4PjSiuuMkDx4trbnGjXj3Bi" && (
              <div className="mb-8">
                <p>
                  Xem sản phẩm tại{" "}
                  <a href="https://vr3d.vn/trienlam/thuy-quai-makara-thap-mam">
                    Triển lãm VR3D.
                  </a>
                </p>
                <iframe
                  width="500"
                  height="480"
                  src="https://vr3d.vn/trienlam/tuong-tac/thuy-quai-makara-thap-mam/embed.html"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <img
              src={nftDetail?.cached_image_uri}
              alt=""
              className="h-[500px] w-[500px] rounded-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <div>
              <div className="flex gap-3 items-center mb-4">
                <img
                  src={nftDetail?.cached_image_uri}
                  alt=""
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="font-semibold">{nftDetail.symbol}</p>
                  <p className="font-normal text-sm text-gray-400">
                    Floor - 0.9 SOL
                  </p>
                </div>
              </div>
              <div className="text-3xl font-semibold">{nftDetail.name}</div>
              <p>56mLo8...xUz</p>
              <div className="bg-slate-200 px-8 py-8 rounded-xl my-8 flex flex-col gap-4">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-lg">Price</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-xl">{price}</span>
                        <img
                          src="/icons/solana-icon.png"
                          alt=""
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-500">
                          ~ {Number(price) * 25.25}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-end font-semibold text-lg">Offer</p>
                      <p className="text-sm text-gray-500">No offer</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CustomButton label="Buy" onClick={onBuyNft} />
                  <CustomButton label="Place offer" />
                </div>
              </div>
              <DropdownContainer label="Attributes">
                {nftDetail.attributes_array.map((attribute: any) => (
                  <div className="flex gap-2">
                    <p>{attribute.trait_type}</p>
                    <p>{attribute.value}</p>
                  </div>
                ))}
              </DropdownContainer>
              <DropdownContainer label="Description">
                <div className="flex gap-2">
                  <p>{nftDetail.description}</p>
                </div>
              </DropdownContainer>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <DropdownContainer label="Suggested">
          <div className="grid grid-cols-4 gap-4">
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
            <NFTCard
              imgHref="/images/nft-1.jpeg"
              name="Quả cầu cửu long"
              price={2.11}
            />
          </div>
        </DropdownContainer>
      </div>
    </div>
  );
};

export default NFTDetailScreen;
