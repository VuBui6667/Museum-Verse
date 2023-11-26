import axios from "axios";
import { MARKETPLACE_ADDRESS, X_API_KEY } from "../../../config/variable";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import SpinnerLoading from "../../common/SpinnerLoading";

export const MarketplaceScreen = () => {
  const [dataFetched, setDataFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getMarket = async () => {
    setIsLoading(true)
    const getMarketUrl = `https://api.shyft.to/sol/v1/marketplace/active_listings?network=devnet&marketplace_address=${MARKETPLACE_ADDRESS}`;
    await axios
      .get(getMarketUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": X_API_KEY,
        },
      })
      .then((response) => {
        setDataFetched(response.data.result);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  };

  useEffect(() => {
    getMarket();
  }, []);


  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28">
      <p className="font-semibold text-amber-500 text-3xl">Marketplace</p>
      {isLoading ?
        <div className="flex justify-center mt-12">
          <SpinnerLoading size={12} />
        </div>
        :
        <div className="mt-12 px-12 md:px-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
            {dataFetched && dataFetched.length
              ? dataFetched.map((element) => <Card data={element} />)
              : null}
          </div>
        </div>
      }
    </div>
  );
};
