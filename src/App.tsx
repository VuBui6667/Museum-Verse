import React from "react";
import HomePage from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateNFTPage from "./pages/create-nft";
import CollectionsPage from "./pages/CollectionsPage";
import WalletPage from "./pages/WalletPage";
import NotConnectWalletScreen from "./components/screens/WalletPage/components/NotConnectWalletScreen";
import MuseumCollectionPage from "./pages/museum-collection";
import NFTDetailPage from "./pages/NFTDetail";
import LoginPage from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketplacePage from "./pages/Marketplace";
import CollectionDetailPage from "./pages/CollectionDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/museum/create-nft",
      element: <CreateNFTPage />,
    },
    {
      path: "/collections",
      element: <CollectionsPage />,
    },
    {
      path: "/wallet",
      element: <WalletPage />,
    },
    {
      path: "/museum/collection",
      element: <MuseumCollectionPage />,
    },
    {
      path: "/museum/login",
      element: <LoginPage />,
    },
    {
      path: "/nft/detail",
      children: [
        {
          path: ":nftAddress/:price/:seller",
          element: <NFTDetailPage />,
        },
      ],
    },
    {
      path: "/marketplace",
      element: <MarketplacePage />,
    },
    {
      path: "/collection",
      children: [
        {
          path: ":id",
          element: <CollectionDetailPage />,
        },
      ],
    }
  ]);

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
