import { useEffect, useState } from "react";
import "./NavTab.css";
import CustomButton from "../CustomButton";
import { X_API_KEY } from "../../../config/variable";
import axios from "axios";
import { useBoundStore } from "../../../zustand";
import NFTCard from "../NFTCard";

function NavTab() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  const [allNFT, setAllNFT] = useState([]);

  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  const onGetAllNFT = async () => {

    await axios.get(`https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${accountInfo.publicKey}`, {
      headers: {
        "x-api-key": X_API_KEY,
      }
    })
      .then((response) => {
        console.log("1");
        console.log("response");
        console.log(response.data.result);
        setAllNFT(response.data.result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    if (accountInfo.publicKey) {
      onGetAllNFT()
    }
  }, [accountInfo])


  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Owned
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Offers
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Loans
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Favorite
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          Activity
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {/* <div className="flex flex-col items-center ">

            <div className="font-bold text-xl">There is nothing here</div>
            <p className="mt-4 text-center">
              You don‘t have any item tradeable on MuseumVerse.
            </p>
            <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

            <div className="flex">
              <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
              <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
            </div>
          </div> */}

          <div className="mt-2">
            <div className="px-2 md:px-0">


              {
                allNFT.length == 0 ? (<div className="flex flex-col items-center ">
                  <div className="font-bold text-xl">There is nothing here</div>
                  <p className="mt-4 text-center">
                    You don‘t have any item tradeable on marketplace.
                  </p>
                  <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

                  <div className="flex">
                    <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />

                    <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
                  </div>
                </div>) : (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                  {
                    allNFT.map((item, index) => <div key={index} className="transition duration-0 hover:duration-150 hover:ease-in hover:transition-all cursor-pointer">
                      <NFTCard imgHref={item["cached_image_uri"]} name={item["name"]} symbol={item["symbol"]} description={item["description"]} />
                    </div>
                    )}
                </div>)
              }
            </div>
          </div>

        </div>


      </div>


      <div
        className={toggleState === 2 ? "content  active-content" : "content"}
      >
        <div className="flex flex-col items-center ">
          <div className="font-bold text-xl">There is nothing here</div>
          <p className="mt-4 text-center">
            You don‘t have any item tradeable on marketplace.
          </p>
          <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

          <div className="flex">
            <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />

            <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
          </div>
        </div>
      </div>

      <div
        className={toggleState === 3 ? "content  active-content" : "content"}
      >
        <div className="flex flex-col items-center ">
          <div className="font-bold text-xl">There is nothing here</div>
          <p className="mt-4 text-center">
            You don‘t have any loans here.
          </p>
          <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

          <div className="flex">
            <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />

            <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
          </div>
        </div>
      </div>

      <div
        className={toggleState === 4 ? "content  active-content" : "content"}
      >
        <div className="flex flex-col items-center ">
          <div className="font-bold text-xl">There is nothing here</div>
          <p className="mt-4 text-center">
            You don‘t have any favorite item.
          </p>
          <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

          <div className="flex">
            <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />

            <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
          </div>
        </div>
      </div>

      <div
        className={toggleState === 5 ? "content  active-content" : "content"}
      >
        <div className="flex flex-col items-center ">
          <div className="font-bold text-xl">There is nothing here</div>
          <p className="mt-4 text-center">
            You don‘t have any trade activity for now.
          </p>
          <p className="mt-2 text-center">Browse collections and buy an item to be able to see it here.</p>

          <div className="flex">
            <CustomButton label="Explore collection" customClassName="break-normal px-4 w-[160px] py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />

            <CustomButton label="Get help" customClassName="px-4 py-2 border border-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] m-2" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default NavTab;