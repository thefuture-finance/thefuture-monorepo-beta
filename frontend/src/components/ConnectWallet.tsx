import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect } from "react";
// import { BrowserProvider  } from "ethers";

export default function ConnectButton() {
  const { open  } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleConnect() {
    await open({ view: "Connect" });
  }

  useEffect(() => {
    (async () => {
      if (isConnected) {
        try {
          // const provider = new BrowserProvider(walletProvider);
          // const signer = await provider.getSigner();
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [isConnected]);


  useEffect(() => {
    async function getBalance() {
      if (isConnected) {
        // const provider = new BrowserProvider(walletProvider);
        // const balance = await provider?.getBalance(address);
      }
    }
    try {
      getBalance();
    } catch (err) {}
  }, [address, walletProvider, isConnected]);

  return (
    <div
      className=
        "bg-[rgba(65,65,65)] h-[32px] rounded-2xl flex w-full justify-center items-center hover:bg-[rgba(55,55,55)]"
    >
      <div className="text-[14px] leading-[12px] w-full grow flex justify-center text-md text-[#F7F7F7]">
        {isConnected ? (
          <div className="typing-demo w-[20ch] text-center">
            <button
              className="w-full"
              onClick={() => open({ view: "Account" })}
            >
            </button>
          </div>
        ) : (
          <div className="typing-demo w-[14ch] text-center">
            <button className="w-full" onClick={() => handleConnect()}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
