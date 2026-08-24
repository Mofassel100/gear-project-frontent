import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardAction } from "@/components/ui/card"
import { allRentalsFromDB } from "../_action/allRentals"
import { IRentalOrder } from "@/lib/types"


export async function RentalTableDemo() {
    const allRental = await allRentalsFromDB()
    
    console.log(allRental,"ami table theke bolci")
  return (
    <Table>
      <TableCaption>A list of your recent user.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Amount</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {allRental?.data?.map((rentals:IRentalOrder) => (
          <TableRow key={rentals.id}>

            <TableCell className="font-medium">{rentals.orderNumber}</TableCell>
            <TableCell className="font-medium">{rentals.orderStatus}</TableCell>
            <TableCell className="font-medium">{rentals.totalAmount}</TableCell>
            {/* <TableCell>{rentals.rentalStartDate}</TableCell>
            <TableCell>{rentals.rentalEndDate}</TableCell> */}
            {/* <TableCell className="text-right"> <CardAction>
                    <UserFormDialog  users={user} />
                </CardAction></TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  )
}
