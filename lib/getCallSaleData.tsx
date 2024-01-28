import { utils } from "ethers"
import abi from "./abi/ERC20FixedPriceSaleStrategy.json"

const getCallSaleData = ({
  tokenId,
  saleStart,
  saleEnd,
  maxTokensPerAddress,
  pricePerToken,
  fundsRecipient,
  erc20Address,
}) => {
  const iface = new utils.Interface(abi)

  return iface.encodeFunctionData("setSale", [
    tokenId,
    {
      saleStart,
      saleEnd,
      maxTokensPerAddress,
      pricePerToken,
      fundsRecipient,
      erc20Address,
    },
  ])
}

export default getCallSaleData
