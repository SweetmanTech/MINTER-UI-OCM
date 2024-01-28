import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "@rainbow-me/rainbowkit/styles.css"

import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, optimism, base, goerli, optimismGoerli, baseGoerli } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"
import React from "react"
import { IS_TESTNET } from "@/lib/consts"
import { ThemeProvider } from "../providers/ThemeProvider"

const { chains, publicClient } = configureChains(
  [
    IS_TESTNET ? goerli : mainnet,
    IS_TESTNET ? optimismGoerli : optimism,
    IS_TESTNET ? baseGoerli : base,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "onchain-magic",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#000000",
          accentColorForeground: "white",
          borderRadius: "medium",
        })}
        modalSize="compact"
        chains={chains}
      >
        <ThemeProvider>
          <SessionProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SessionProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
