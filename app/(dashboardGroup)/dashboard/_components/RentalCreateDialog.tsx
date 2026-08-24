/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {  ICategory, IGearItem, IUserSingle } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateRental } from "../_action/action";
import { createRental } from "../_action/rentalCreate";


type GearFormDiallogProps = {
    mode : "edit" | "create"
    category?: ICategory[];
    user? : IUserSingle;
    gear?:IGearItem
}

export function RentalFormDialogDB({ gear,mode }: GearFormDiallogProps) {

    const [open, setOpen] = useState(false);

    const action =  mode === "edit" && gear
            ? updateRental.bind(null, gear.id as string)
            : createRental;
        
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
                            Create Rental
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
                    {gear?.id && mode === "create" && (
    <input
      type="hidden"
      name="gearItemId"
      value={gear.id}
    />
  )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input readOnly id="name" defaultValue={gear?.name} name="name" placeholder="Enter Gear Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="model">Gear Model</Label>
                        <Input readOnly id="model" defaultValue={gear?.model} name="model" placeholder="Enter Gear Models" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="">Gear Brand</Label>
                        <Input readOnly id="model" defaultValue={gear?.brand}  required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stockQuantity">Quantity</Label>
                        <Input name="stockQuantity" placeholder="Enter number" id="stockQuantity" defaultValue={gear?.stockQuantity}  required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input readOnly name="price" placeholder="Enter number" id="price" defaultValue={gear?.price}  required />
                    </div>
                        
                    <div className="space-y-2">
                        <Label htmlFor="description"> Gear Description</Label>
                        <Textarea
                            id="description"
                            readOnly
                            defaultValue={gear?.description}
                            name="description"
                            placeholder="Enter Gear details"
                            required
                            className="min-h-32"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Rental Crate"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}