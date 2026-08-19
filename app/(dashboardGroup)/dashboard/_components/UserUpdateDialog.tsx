/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IRentalOrder, IUserSingle } from "@/lib/types";
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
import { createRental, updateRental } from "../_action/action";
import { updateUser } from "../_action/userUpdated";
import { useRouter } from "next/navigation"


type UserFormDiallogProps = {

    users?: IUserSingle;
}

export function UserFormDialog({ users }: UserFormDiallogProps) {
    const [open, setOpen] = useState(false);

    const action =  updateUser.bind(null, users?.id as string)
        
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
                
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" />
                            Edit
                        </Button>
                 
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                       User Status Updated
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                 
                   <div className="space-y-2">
            <Label htmlFor="status">Status</Label>

            <Select
              name="status"
              defaultValue={users?.status}
              required
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
              </SelectContent>
            </Select>
          </div>
                 
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." :"Save Changes" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}