/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {  ICategory, IGearItem, IRentalOrder, IUserSingle } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { createGear, updateGear } from "../_action/gearCreate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "../_action/userUpdated";
import { paymentCreate } from "../_action/payment";


type PaymentFormDiallogProps = {
    mode : "edit" | "create"
    rentals?: IRentalOrder,
    user? : IUserSingle;
}

export function PaymentFormDialogDB({ rentals,mode }: PaymentFormDiallogProps) {

    const [open, setOpen] = useState(false);

    const action =  mode === "edit" && rentals
            ? updateUser.bind(null, rentals?.id as string)
            : paymentCreate;
        
     const router  = useRouter()
    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
          
            
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
            router.refresh()
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state]);


    
    


     return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger >
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" />
                            Pay Now
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Gear" : "Create Gear"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    
    <input
      type="hidden"
      name="id"
      value={rentals?.id}
    />

                    <div className="space-y-2">
                        <Label htmlFor="name">Order Number</Label>
                        <Input id="orderNumber"  readOnly defaultValue={rentals?.orderNumber} name="name" placeholder="Enter Gear Name" required />
                    </div>
                  
                          {/* {
                            mode === "edit" ? "":<><div  className="space-y-2">
            <Label htmlFor="categoryId">Gear Category</Label>

  <Select name="categoryId" required>
  <SelectTrigger id="categoryId" className="w-full">
    <SelectValue placeholder="Select Condition" />
  </SelectTrigger>

  <SelectContent>
    {category?.map((categories) => (
      <SelectItem
        key={categories.id}
        value={categories.id}

      >
        {categories.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          </div>

                       <div className="space-y-2">
            <Label htmlFor="Condiont">Gear Condition</Label>

  <Select name="condition" required>
  <SelectTrigger id="condition" className="w-full">
    <SelectValue  placeholder="Select Condition" />
  </SelectTrigger>

  <SelectContent>
    {condition.map((condi) => (
      <SelectItem
        key={condi.values}
        value={condi.values}
        
      >
        {condi.level}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          </div>
                        </>   } */}
         
                  <div className="space-y-2">
                        <Label htmlFor="brand">Delevery Fee</Label>
                        <Input defaultValue={rentals?.deliveryFee} id="brand" name="brand" readOnly required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="brand">SubTotal </Label>
                        <Input defaultValue={rentals?.subtotal} id="subtotal" type="number" name="price" readOnly placeholder="Enter Gear price" required />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="picture">Total Amount</Label>
                        <Input defaultValue={rentals?.totalAmount} id="totalAmount"  name="picture" placeholder="Enter Gear picture" required />
                    </div>
                    {/* <div className="space-y-2">
                        <Label htmlFor="description"> Gear Description</Label>
                        <Textarea
                            id="description"
                            defaultValue={gear?.description}
                            name="description"
                            placeholder="Enter Gear details"
                            required
                            className="min-h-32"
                        />
                    </div> */}

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Pay now"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}