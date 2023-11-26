import { useBoundStore } from "../../../zustand";
import NavTab from "../../common/NavTab/NavTab"
import AvatarBlock from "./components/AvatarBlock"

const WalletPageScreen = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }));

  return (
    <div className="mt-12 md:mt-0 md:py-24 md:px-12 lg:px-16 xl:px-28">
      {accountInfo.isMuseum ?
        <div>
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-800" role="alert">
            <span className="font-medium">Musuem Only!</span> You don't have permission to access this page.
          </div>
          <p className="text-sm font-normal text-gray-400">Nếu bạn thuộc phía bảo tàng hãy liên hệ với chúng tôi!</p>
        </div> :
        <>
          <AvatarBlock />
          <NavTab />
        </>
      }
    </div>
  )
}

export default WalletPageScreen