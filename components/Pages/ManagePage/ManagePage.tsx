import { CardTitle, CardDescription, CardHeader, Card } from "@/components/Card/Card"
import ManagePageContent from "./ManagePageContent"

const ManagePage = () => (
  <div className="w-full h-[100vh] flex flex-col justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>List Item for Sale</CardTitle>
        <CardDescription>Enter the price in USDC for the item you want to list.</CardDescription>
      </CardHeader>
      <ManagePageContent />
    </Card>
  </div>
)

export default ManagePage
