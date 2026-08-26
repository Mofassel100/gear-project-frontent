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
import { RegistrationAction } from "../_actions/authRegistration";


const RegistrationForm = () => {

    const [state, action, pending] = useActionState(RegistrationAction, false)
    // const router = useRouter()


    useEffect(()=> {
        if(!state) return;
        if(!state.success){
            toast.error(state.message || "Registration  failed");
        }
    }, [state]);

  return (
    <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4" >
            <Input name="name" type="name" placeholder="Enter Your Full name" required />
            <Input name="email" type="email" placeholder="Enter Your Email" required />
            <Input name="password" type="password" placeholder="Enter Your Password" required />
                <Select
              name="role"
              defaultValue="Customer"
              required
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select Role" />
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

export default RegistrationForm