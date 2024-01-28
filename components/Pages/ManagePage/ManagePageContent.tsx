import Button from "@/components/Button"
import { CardContent } from "@/components/Card/Card"
import Input from "@/components/Input"
import Label from "@/components/Label"
import useCollection from "@/hooks/useCollection"
import getIpfsLink from "@/lib/getIpfsLink"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PhotoGrid from "./PhotoGrid"

const ManagePageContent = () => {
  const { query } = useRouter()
  const { collectionAddress, chainId } = query
  const { drops } = useCollection({
    collectionAddress: collectionAddress as string,
    chainId: parseInt(chainId as string, 10),
  })
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        const promises = drops.map((item) => fetch(item.uri).then((response) => response.json()))
        const results = await Promise.all(promises)
        console.log("SWEETS RESULTS", results) // This will log the resolved values of each promise
        const imageUrls = results.map((item) => getIpfsLink(item.image))
        console.log("SWEETS imageUrls", imageUrls) // This will log the resolved values of each promise
        setPhotos(imageUrls)
      } catch (error) {
        console.error("Error fetching URIs:", error)
      }
    }
    if (drops.length > 0) init()
  }, [drops])

  return (
    <CardContent>
      <div className="flex flex-col items-center space-y-4">
        <PhotoGrid
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photos={photos}
        />
        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price in USDC</Label>
            <Input id="price" placeholder="Enter price" type="number" />
          </div>
          <Button type="submit">List for Sale</Button>
        </form>
      </div>
    </CardContent>
  )
}

export default ManagePageContent
