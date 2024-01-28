import { Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEthersSigner, ZORA_FEE } from "onchain-magic";
import abi from "../lib/abi/ERC20FixedPriceSaleStrategy.json";
import getDefaultProvider from "@/lib/getDefaultProvider";

type UseErc20FixedPriceSaleStrategyParams = {
  saleConfig: string
  drops: any[]
  chainId: number
}

const useErc20FixedPriceSaleStrategy = ({
  saleConfig,
  drops,
  chainId
}: UseErc20FixedPriceSaleStrategyParams) => {
  const [priceValues, setPriceValues] = useState([] as string[])
  const saleConfigContract = useMemo(
    () => saleConfig && new Contract(saleConfig, abi, getDefaultProvider(chainId)),
    [saleConfig, chainId],
  )

  const sale = useCallback(
    async (tokenContract: string, tokenId: string) => {
      try {
        const response = await saleConfigContract.sale(tokenContract, tokenId)
        return response
      } catch (error) {
        return error
      }
    },
    [saleConfigContract],
  )

  useEffect(() => {
    const getValues = async () => {
      if (drops.length === 0) return
      console.log("SWEETS DROPS", drops)
      const pricesPromises = drops.map((drop: any) => sale(drop.contractAddress, drop.tokenId))
      const prices = await Promise.all(pricesPromises)
      const values = prices.map((price) => price.pricePerToken.toString())
      setPriceValues(values)
    }

    getValues()
  }, [drops, sale])

  return { sale, priceValues }
}

export default useErc20FixedPriceSaleStrategy