/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {  ICategory, IGearItem, IUserSingle } from "@/lib/types";
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


type GearFormDiallogProps = {
    mode : "edit" | "create"
    category?: ICategory[];
    user? : IUserSingle;
    gear?:IGearItem
}

export function GearFormDialogDB({ category,user,gear,mode }: GearFormDiallogProps) {

    const [open, setOpen] = useState(false);

    const action =  mode === "edit" && gear
            ? updateGear.bind(null, gear.id as string)
            : createGear;
        
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

    const condition = [
       {
 level: "NEW",
        values: "NEW"
       },
       {
 level: "EXCELLENT",
        values: "EXCELLENT"
       },
       {
 level: "GOOD",
        values: "GOOD"
       },
       {
 level: "FAIR",
        values: "FAIR"
       },
    ]
  
    
    


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
                            Create Gear
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
                    {gear?.id && mode === "edit" && (
    <input
      type="hidden"
      name="gearId"
      value={gear.id}
    />
  )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={gear?.name} name="name" placeholder="Enter Gear Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="model">Gear Model</Label>
                        <Input id="model" defaultValue={gear?.model} name="model" placeholder="Enter Gear Models" required />
                    </div>
                          {
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
                        </>   }
         
                  <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input defaultValue={gear?.brand} id="brand" name="brand" placeholder="Enter Gear Brand" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input defaultValue={gear?.price} id="price" type="number" name="price" placeholder="Enter Gear price" required />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="picture">Picture</Label>
                        <Input defaultValue={gear?.picture} id="picture" type="picture" name="picture" placeholder="Enter Gear picture" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description"> Gear Description</Label>
                        <Textarea
                            id="description"
                            defaultValue={gear?.description}
                            name="description"
                            placeholder="Enter Gear details"
                            required
                            className="min-h-32"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Gear"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}