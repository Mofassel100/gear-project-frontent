/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { IRentalOrder } from "@/lib/types";
import { createRental, updateRental } from "../_action/action";

type PostFormDialogProps = {
    mode: "create" | "edit";
    rental?: IRentalOrder;
}

export function PostFormDialog({ mode, rental }: PostFormDialogProps) {
    const [open, setOpen] = useState(false);

    const action = mode === "edit" && rental
        ? updateRental.bind(null, rental?.id  as string)
        : createRental;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "rentalOrders updated successfully" : "Rentals created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

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
                            Create Post
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Post" : "Create Post"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Status</Label>
                        <Input id="title" name="title" defaultValue={rental?.orderStatus} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Subtotal</Label>
                        <Textarea
                            id="content"
                            name="content"
                            defaultValue={rental?.subtotal}
                            required
                            className="min-h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            defaultValue={rental?.deliveryFee ?? ""}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            name="tags"
                            defaultValue={rental?.totalAmount}
                            placeholder="tech, sports"
                        />
                    </div>
                    {/* <Label className="flex items-center gap-2">
                        <Checkbox name="isPremium" defaultChecked={post?.isPremium} />
                        Mark as premium content
                    </Label> */}
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Post"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}