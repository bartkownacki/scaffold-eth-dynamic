import { useEffect } from "react";
import type { AppProps } from "next/app";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { useEthPrice } from "~~/hooks/scaffold-eth";
import { useAppStore } from "~~/services/store/store";
import "~~/styles/globals.css";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.setEthPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }
  }, [setEthPrice, price]);

  return (
    <>
      <NextNProgress />
      <DynamicContextProvider
        settings={{
          environmentId: "fbf6e5e6-e22c-4ab8-bcc0-77323b68fb62",
          initialAuthenticationMode: "connect-only",
          evmNetworks: [
            {
              chainName: "Hardhat",
              chainId: 31337,
              networkId: 31337,
              rpcUrls: ["http://127.0.0.1:8545"],
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        }}
      >
        <DynamicWagmiConnector>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
          <Toaster />
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </>
  );
};

export default ScaffoldEthApp;
