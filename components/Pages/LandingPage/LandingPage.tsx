import Input from "@/components/Input"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEthersSigner } from "onchain-magic"
import { useState } from "react"
import SearchButton from "./SearchButton"

export default function Component() {
  const signer = useEthersSigner()
  const [collectionAddress, setCollectionAddress] = useState("")

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-11 text-center">
          {signer && <ConnectButton label="Sign Up" />}

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Zora 💸 USDC
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Start accepting USDC payments for your imagination on{" "}
              <a href="https://zora.co/" target="_blank" rel="noreferrer">
                Zora.
              </a>
            </p>
          </div>

          {signer ? (
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  onChange={(e) => setCollectionAddress(e.target.value)}
                  placeholder="Enter collection address"
                  type="text"
                />
                <SearchButton collectionAddress={collectionAddress} />
              </form>
            </div>
          ) : (
            <ConnectButton label="Sign Up" />
          )}
        </div>
      </div>
    </section>
  )
}
