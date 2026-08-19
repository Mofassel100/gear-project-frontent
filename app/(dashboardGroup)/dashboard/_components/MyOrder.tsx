import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MessageSquareIcon, SparklesIcon } from "lucide-react";

import { IRentalOrder } from "@/lib/types";
import { RentalFormDialog } from "./MyOrderDialog";

type MyPostCardProps = {
    rental: IRentalOrder;
}

export function MyPostCard({rental}: MyPostCardProps) {
    const rentalCount = rental.totalAmount?? rental.orderNumber?.length ?? 0;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline">{rental.orderStatus}</Badge>
                    {
                        rental && (
                            <Badge>
                                <SparklesIcon data-icon="inline-start" />
                                Premium
                            </Badge>
                        )
                    }
                </div>
                <CardTitle className="text-lg">{rental.orderNumber}</CardTitle>
                <CardAction>
                    <RentalFormDialog mode="edit" rentals={rental} />
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="line-clamp-3 whitespace-pre-line text-muted-foreground">
                    {rental.orderStatus}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(rental.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                        <MessageSquareIcon className="size-3.5" />
                        {rental.orderNumber}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}