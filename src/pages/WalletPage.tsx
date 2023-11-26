import MainLayout from '../components/layouts/MainLayout'
import WalletPageScreen from '../components/screens/WalletPage'
import NotConnectWalletScreen from '../components/screens/WalletPage/components/NotConnectWalletScreen';
import { useBoundStore } from '../zustand';
import ConnectWallet from '../components/common/ConnectWallet';

const WalletPage = () => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }));

  if (accountInfo.publicKey) {
    return (
      <MainLayout>
        <WalletPageScreen />
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <div className="mt-24 w-[200px] border-2 border-black px-6 py-4 rounded-xl m-auto">
          <ConnectWallet />
        </div>
      </MainLayout>
    )
  }

}

export default WalletPage