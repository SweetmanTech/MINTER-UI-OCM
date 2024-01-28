import Button from "@/components/Button"
import { useRouter } from "next/router"
import { isAddress } from "viem"
import { useNetwork } from "wagmi"

const SearchButton = ({ collectionAddress }) => {
  const { push } = useRouter()
  const { chain } = useNetwork()

  const handleClick = () => {
    if (!isAddress(collectionAddress)) return
    push(`/manage/${chain.id}/${collectionAddress}`)
  }
  return (
    <Button type="button" onClick={handleClick}>
      Search
    </Button>
  )
}

export default SearchButton
