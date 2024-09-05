import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { hc } from "hono/client";
import { AppType } from "../../../backend/src/app.ts";
const client = hc<AppType>("http://localhost:3000", {
  init: {
    credentials: "include",
  },
});

export const projectId = "46ddd9c087e8a513d84bcb09d5084313";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org",
};

const scroll = {
  chainId: 534352,
  name: "Scroll",
  currency: "ETH",
  explorerUrl: "https://scrollscan.com/",
  rpcUrl: "https://rpc.scroll.io",
};

const scroll_sepolia = {
  chainId: 534351,
  name: "EDU",
  currency: "EDU",
  explorerUrl: "https://sepolia.scrollscan.com/",
  rpcUrl: "https://sepolia-rpc.scroll.io",
};

const optimism = {
  chainId: 10,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://optimistic.etherscan.io",
  rpcUrl: "	https://mainnet.optimism.io",
};

const educhain = {
  chainId: 656476,
  name: "EDU",
  currency: "EDU",
  explorerUrl: "https://opencampus-codex.blockscout.com/",
  rpcUrl: "https://rpc.open-campus-codex.gelato.digital",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 534351, // used for the Coinbase SDK
});

import {
  type SIWESession,
  type SIWEVerifyMessageArgs,
  type SIWECreateMessageArgs,
  createSIWEConfig,
  formatMessage,
} from "@web3modal/siwe";
import { ReactNode } from "react";

async function getNonce() {
  const response = await client.auth.nonce.$get();
  if (!response.ok) {
    return "";
  }

  return await response.json();
}

async function signOut() {
  return false;
}

/* Function that returns the user's session - this should come from your SIWE backend */
async function getSession() {
  try {
    const res = await client.auth.personal_information.$get();
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data as SIWESession;
  } catch (err) {
    throw new Error("Network response was not ok");
  }
}

/* Use your SIWE server to verify if the message and the signature are valid */
const verifyMessage = async ({ message, signature }: SIWEVerifyMessageArgs) => {
  try {
    const response = await client.auth.verify.$post({
      json: { message, signature },
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result === true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Check the full example for signOut and getNonce functions ...

/* Create a SIWE configuration object */
const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: window.location.host,
    uri: "http://localhost:3000",
    chains: [1, 2020],
    statement: "Please sign with your account",
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce,
  getSession,
  verifyMessage,
  signOut,
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  defaultChain: scroll_sepolia,
  chains: [scroll_sepolia /* , scroll */],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  chainImages: {
    // 534351: "/assets/images/scroll.png",
    // 534352: "/assets/images/scroll.png",
  },
  siweConfig,
});

export function AppKit({ children }: { children: ReactNode }) {
  return children;
}
