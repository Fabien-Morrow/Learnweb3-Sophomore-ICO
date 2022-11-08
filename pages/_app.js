import { useState } from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "ICO",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
