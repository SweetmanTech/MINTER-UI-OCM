import Button from "@/components/Button"
import { CardContent } from "@/components/Card/Card"
import Input from "@/components/Input"
import Label from "@/components/Label"
import { useCollection } from "onchain-magic"
import getIpfsLink from "@/lib/getIpfsLink"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import getCallSaleData from "@/lib/getCallSaleData"
import { useAccount } from "wagmi"
import { BigNumber } from "ethers"
import useErc20FixedPriceSaleStrategy from "@/hooks/useErc20FixedPriceSaleStrategy"
import PhotoGrid from "./PhotoGrid"

const ManagePageContent = () => {
  const { query } = useRouter()
  const { collectionAddress, chainId } = query
  const { address } = useAccount()
  const { drops, isAdminOrRole, addPermission, callSale } = useCollection({
    collectionAddress: collectionAddress as string,
    chainId: parseInt(chainId as string, 10),
  })
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const erc20Minter = "0xca1ecd1ff03528838598f13c9340e73307f9485e"
  const usdcAddress = "0x98339D8C260052B7ad81c28c16C0b98420f2B46a" // GOERLI
  const { priceValues } = useErc20FixedPriceSaleStrategy({
    saleConfig: erc20Minter,
    drops,
    chainId: parseInt(chainId as string, 10),
  })
  const [usdcAmount, setUsdcAmount] = useState("0")
  const usdcMultiplier = "1000000"

  const handleClick = async () => {
    if (!isAdmin) {
      addPermission(selectedPhoto + 1, erc20Minter, 2)
      return
    }
    console.log("SWEETS CALLSALE", selectedPhoto)
    const data = getCallSaleData({
      tokenId: selectedPhoto + 1,
      saleStart: 0,
      saleEnd: BigInt("18446744073709551615"),
      pricePerToken: BigNumber.from(usdcAmount).mul(BigNumber.from(usdcMultiplier)),
      fundsRecipient: address,
      erc20Address: usdcAddress,
      maxTokensPerAddress: 0,
    })
    console.log("SWEETS data", data)
    callSale(selectedPhoto + 1, erc20Minter, data)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const promises = drops.map((item) => fetch(item.uri).then((response) => response.json()))
        const results = await Promise.all(promises)
        const imageUrls = results.map((item) => getIpfsLink(item.image))
        setPhotos(imageUrls)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching URIs:", error)
      }
    }
    if (drops.length > 0) init()
  }, [drops])

  useEffect(() => {
    const checkIsAdmin = async () => {
      const response = await isAdminOrRole(erc20Minter, selectedPhoto + 1, 2)
      setIsAdmin(response)

      setUsdcAmount(
        response
          ? BigNumber.from(priceValues[selectedPhoto] || "0")
              .div(BigNumber.from(usdcMultiplier))
              .toString()
          : "0",
      )
    }
    checkIsAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhoto])

  return (
    <CardContent>
      <div className="flex flex-col items-center space-y-4">
        <PhotoGrid
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photos={photos}
          isSelectedAdmin={isAdmin}
        />
        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price in USDC</Label>
            <Input
              id="price"
              placeholder="Enter price"
              value={usdcAmount}
              type="number"
              onChange={(e) => setUsdcAmount(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleClick}>
            List for Sale
          </Button>
        </form>
      </div>
    </CardContent>
  )
}

export default ManagePageContent
