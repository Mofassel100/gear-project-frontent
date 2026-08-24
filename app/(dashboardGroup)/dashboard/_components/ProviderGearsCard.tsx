

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
import { ICategory, IGearItem } from "@/lib/types";

import Link from "next/link";
import { GearFormDialogDB } from "./GearDialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CardImageGearsProps {
  props: IGearItem;
}

export default function ProviderCardGearImage({props}: CardImageGearsProps) {

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img className=""
        src={props.picture}
      />
      <CardHeader className="">
        <CardAction>
          <Badge variant="secondary">{props.brand}</Badge>
        </CardAction>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>
          <CardTitle>Price: {props.price}</CardTitle>
         
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full  justify-center items-center" >
      <GearFormDialogDB mode="edit" gear={props} key={props.id} ></GearFormDialogDB>
      </CardFooter>
    </Card>
  )
}
