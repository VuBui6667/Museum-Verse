import React, { useState, useEffect, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SearchInput } from "./components/SearchInput";
import ConnectWallet from "../../common/ConnectWallet";
import DropDownMenu from "./components/DropDownMenu";
import { useClickOutside } from "../../../hooks";
import { Link } from "react-router-dom";
import { useBoundStore } from "../../../zustand";

const SCROLL_THRESHOLD = 80;

const Header = () => {
  const { t } = useTranslation(["header"]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [isTransParent, setIsTransParent] = useState<boolean>(false);
  const [isOpenDropDownMenu, setIsOpenDropDownMenu] = useState<boolean>();

  const toggleRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { accountInfo, removeAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
  }));

  useClickOutside(dropDownRef, toggleRef, () => setIsOpenDropDownMenu(false));

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= SCROLL_THRESHOLD) {
        setIsTransParent(true);
      } else {
        setIsTransParent(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", changeColor);
      }
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpenDropDownMenu((prev) => !prev);
  };

  return (
    <div
      className={`sticky top-0 h-10 ${
        isTransParent ? "backdrop-blur-lg bg-white/30" : "bg-slate-100"
      } text-slate-900 flex items-center p-8 border-b border-slate-300 justify-between w-screen z-99`}
    >
      <div className="flex gap-8 items-center">
        <Link to="/">
          <p className="font-bold text-xl">
            Museum
            <span className="text-amber-400">Verse</span>
          </p>
        </Link>

        <SearchInput
          placeholder={t("searchPlaceholder")}
          onChange={setSearchValue}
        />
      </div>
      <div className="flex gap-8 font-semibold items-center">
        {accountInfo.isMuseum && (
          <>
            <Link to="/museum/create-nft">
              <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms]">
                Create NFTs
              </p>
            </Link>
            <Link to="/museum/collection">
              <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms]">
                My Collection
              </p>
            </Link>
          </>
        )}
        <Link to="/collections">
          <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms]">
            {t("collections")}
          </p>
        </Link>
        <Link to="/marketplace">
          <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms]">
            Marketplace
          </p>
        </Link>
        {!accountInfo.isMuseum && accountInfo.publicKey && (
          <Link to="/wallet">
            <p className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg transition-all delay-[20ms]">
              Wallet
            </p>
          </Link>
        )}
        <div className="relative" ref={toggleRef} onMouseDown={handleMouseDown}>
          {accountInfo.publicKey.length === 0 ? (
            <ConnectWallet />
          ) : (
            <div className="bg-black rounded-xl text-white font-semibold px-4 py-2 text-sm cursor-pointer hover:bg-white border hover:border-black hover:text-black transition-all delay-75">
              {accountInfo.publicKey.slice(0, 7)}...
            </div>
          )}
        </div>
        <div
          className={`absolute top-16 right-8 ${
            isOpenDropDownMenu ? "menu-show" : "menu-hidden"
          }`}
          ref={dropDownRef}
        >
          <DropDownMenu onLogout={removeAccountInfo} />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
