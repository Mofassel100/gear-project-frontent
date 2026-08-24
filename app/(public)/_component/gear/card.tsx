
import { RentalFormDialogDB } from "@/app/(dashboardGroup)/dashboard/_components/RentalCreateDialog";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
 
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  IGearItem } from "@/lib/types"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CardImageGearsProps {
  props: IGearItem;
}
export default function CardGearImage({props}: CardImageGearsProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={props.picture}
      />
      <CardHeader className="">
        <CardAction>
          <Badge variant="secondary">{props.status}</Badge>
        </CardAction>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>Price : 
         {props.price}
        </CardDescription>
       
       
      </CardHeader>
      <CardFooter className="w-full justify-center items-center" >
        <Button className="w-full"><RentalFormDialogDB mode="create" gear={props}></RentalFormDialogDB></Button>
      </CardFooter>
    </Card>
  )
}
