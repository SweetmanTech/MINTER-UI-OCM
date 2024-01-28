import { useEffect, useMemo, useState } from "react"
import { BigNumber, Contract } from "ethers"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@zoralabs/protocol-deployments"
import {
  getNFTsForContract,
  getFormattedDrops,
  getCalldatas,
  ZORA_FEE,
  getEncodedMinterArgs,
  useEthersSigner,
} from "onchain-magic"
import abi from "../lib/abi/Zora1155Drop.json"
import useUniversalMinter from "./useUniversalMinter"
import useZoraFixedPriceSaleStrategy from "./useZoraFixedPriceSaleStrategy"
import usePermission from "./usePermission"

type UseCollectionParams = {
  collectionAddress: string
  chainId: number
  minterOverride?: string
}

const useCollection = ({ collectionAddress, chainId, minterOverride }: UseCollectionParams) => {
  const [drops, setDrops] = useState([] as any)
  const { mintBatchWithoutFees } = useUniversalMinter(chainId)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const minter =
    minterOverride ||
    zoraCreatorFixedPriceSaleStrategyAddress[
      chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
    ]
  const { priceValues, sale } = useZoraFixedPriceSaleStrategy({ saleConfig: minter, drops })
  const { switchNetwork } = useSwitchNetwork()
  const signer = useEthersSigner()
  const collectionContract = useMemo(
    () => collectionAddress && new Contract(collectionAddress, abi, signer),
    [collectionAddress, signer],
  )
  const { isAdminOrRole } = usePermission(collectionContract)

  const collectAll = async () => {
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId)
      return false
    }
    const targets = Array(drops.length).fill(collectionAddress)
    const calldatas = getCalldatas(drops.length, minter, address as string, address as string)
    const totalValue = priceValues.reduce(
      (total: any, value: any) => total.add(BigNumber.from(value)),
      BigNumber.from(0),
    )
    const response = await mintBatchWithoutFees(targets, calldatas, priceValues, totalValue)
    return response
  }

  const collectWithRewards = async (
    tokenId: string,
    to: string,
    referral: string,
    comment = "🪄🪄🪄",
  ) => {
    const response = await sale(collectionAddress, tokenId)
    const value = BigNumber.from(response.pricePerToken.toString()).add(ZORA_FEE)
    const minterArguments = getEncodedMinterArgs(to, comment)
    const tx = await collectionContract.mintWithRewards(
      minter,
      tokenId,
      1,
      minterArguments,
      referral,
      {
        value,
      },
    )

    const receipt = await tx.wait()
    return receipt
  }

  useEffect(() => {
    const init = async () => {
      if (!collectionAddress) return
      const response = await getNFTsForContract(collectionAddress, chainId)
      const formattedDrops = getFormattedDrops(response.nfts, chainId)
      setDrops(formattedDrops)
    }

    init()
  }, [collectionAddress, chainId])

  return { drops, collectAll, priceValues, collectWithRewards, isAdminOrRole }
}

export default useCollection
