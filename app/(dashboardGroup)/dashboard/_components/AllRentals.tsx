import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { allRentalsFromDB } from "../_action/allRentals"
import { IRentalOrder } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PaymentFormDialogDB } from "./payment"


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
          <TableHead>Payment</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {allRental?.data?.map((rentals:IRentalOrder) => (
          <TableRow key={rentals.id}>

            <TableCell className="font-medium">{rentals.orderNumber}</TableCell>
            <TableCell className="font-medium">{rentals.paymentStatus}</TableCell>
            <TableCell className="font-medium">{rentals.totalAmount}</TableCell>
            <TableCell className="font-medium">{rentals.paymentStatus == 
            "PENDING" ?  <TableCell className="font-medium"><PaymentFormDialogDB mode="create" rentals={rentals}></PaymentFormDialogDB></TableCell>:  <TableCell className="font-medium">Paid</TableCell> }</TableCell>
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
