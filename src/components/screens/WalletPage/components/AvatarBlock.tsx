import Avvvatars from 'avvvatars-react'
import { useBoundStore } from '../../../../zustand';

const AvatarBlock = () => {
  let account = localStorage.getItem("zustand.museum_nft");
  console.log("public key");
  console.log(account);
  console.log(typeof account);

  const { accountInfo, removeAccountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
    removeAccountInfo: store.removeAccountInfo,
  }));

  return (
    <div className="flex">
      <div className="flex items-center">
        <Avvvatars value="best_user@gmail.com"
          size={80} style="shape" />
        <div className="ml-5">
          <div className="font-bold">{accountInfo.publicKey.substring(0, 7)}</div>
          <div className="p-2 rounded-xl bg-amber-100">{accountInfo.publicKey}</div>
        </div>
      </div>
    </div>
  )
}

export default AvatarBlock