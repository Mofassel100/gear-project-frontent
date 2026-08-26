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
import { ICategory } from "@/lib/types"
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CardImageProps {
  props: ICategory;
}
export default function CardImage({props}: CardImageProps) {
  
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
     {
      props ?( <Image
        src="/gears/gear1.jpg"
        alt=""
  width={500}
  height={500}
      />):<div>No image available</div>
     }
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{props.status}</Badge>
        </CardAction>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>
         
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full justify-center items-center" >
       <Link  href={"/gear"}>  <Button >Details</Button></Link>
      </CardFooter>
    </Card>
  )
}
