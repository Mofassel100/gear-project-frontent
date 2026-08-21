"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { createRental } from "../_action/rentalCreate";
import { getGear } from "@/app/(public)/_action/gear";



const RentalCreated = ({}) => {

    const [state, action, pending] = useActionState(createRental, false)
    // const router = useRouter()


    useEffect(()=> {
        if(!state) return;

      

        if(!state.success){
            toast.error(state.message || "Rental Create  failed");
        }
    }, [state]);


  return (
    <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
           
                <Select
              name="gearItemId"
              required
            >
              <SelectTrigger id="gearItemId" className="w-full">
                <SelectValue placeholder="Select Gear Items" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Provider">Provider</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
                {
                    pending ? "Submitting..." : "Register"
                }
            </Button>
        </Card>
    </form>
  )
}

export default RentalCreated