import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { allUserFromDB } from "../_action/allUser"
import { use } from "react"
import { IUserSingle } from "@/lib/types"
import { CardAction } from "@/components/ui/card"
import { UserFormDialog } from "./UserUpdateDialog"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export async function TableDemo() {
    const allUser = await allUserFromDB()
    
    console.log(allUser,"ami table theke bolci")
  return (
    <Table>
      <TableCaption>A list of your recent user.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated Status</TableHead>
          <TableHead className="text-right">name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allUser?.data?.map((user:IUserSingle) => (
          <TableRow key={user.id}>

            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-right"> <CardAction>
                    <UserFormDialog  users={user} />
                </CardAction></TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  )
}
