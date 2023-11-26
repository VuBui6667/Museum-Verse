import { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useBoundStore } from "../../../zustand";
import museums from "../../../api/museums";
import { MuseumInput } from "../../../model/api";
import SpinnerLoading from "../SpinnerLoading";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  } else {
    console.log("install phantom please");
  }
};

const ConnectWallet = () => {
  const { t } = useTranslation(["common"]);

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );

  const [walletKey, setWalletKey] = useState<string>();

  const { setWebAccountInfo } = useBoundStore((store) => ({
    setWebAccountInfo: store.saveWebAccountInfo,
  }));

  const fetchMuseumByPublicKey = async (publicKey: string) => {
    const museumInput: MuseumInput = {
      publicKey,
    };
    try {
      const response = await museums.get(museumInput)
      console.log("response: ", response)
      console.log(response)
      const accountInfo = {
        publicKey,
        marketPlaceAddress: '',
        isMuseum: !!Object.values(response).length
      }
      setWebAccountInfo(accountInfo)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;
    setIsLoading(true)
    if (solana) {
      try {
        const response = await solana.connect();
        console.log("account info", response);
        console.log("wallet account ", response.publicKey.toString());
        fetchMuseumByPublicKey(response.publicKey.toString());
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        console.log(err);
        setIsLoading(false)
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);
  return (
    <div
      onClick={connectWallet}
      className="bg-black rounded-xl text-white font-semibold px-4 py-2 text-sm cursor-pointer hover:bg-white border hover:border-black hover:text-black transition-all delay-75 text-center m-auto flex justify-center"
    >
      {isLoading ? <SpinnerLoading size={4} /> : t("connectWallet")}
    </div>
  );
};

export default memo(ConnectWallet);
