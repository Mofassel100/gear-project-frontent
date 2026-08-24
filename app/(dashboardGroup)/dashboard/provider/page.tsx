import { Button } from "@/components/ui/button";
import { GearFormDialogDB } from "../_components/GearDialog";
import { getGear } from "@/app/(public)/_action/gear";
import { getMe } from "@/service/getMe";
import { getGearCategory } from "../_action/gearGet";
import { IGearItem } from "@/lib/types";
import ProviderCardGearImage from "../_components/ProviderGearsCard";


export default async function ProviderPage() {
  const category = await getGearCategory()
  const userProvider = await getMe()
  const gear = await getGear()
  console.log(category)

  return (
    <div>

      <div className="p-2 grid items-end justify-end "><Button><GearFormDialogDB mode="create" key={""} gear={gear} category={category.data} user= {userProvider}  /></Button></div>
      <div className="w-full overflow-x-auto">
           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center gap-4 p-4">
             {userProvider?.data?.gearItems?.map((item:IGearItem) => (
               <div
                 key={item.id}
                 className="
                   w-[260px]
                   shrink-0
                   sm:w-[280px]
                   md:w-[300px]
                   lg:w-[320px]
                   xl:w-[340px]
                 "
               >
                 <ProviderCardGearImage  props={item} />
               </div>
             ))}
           </div>
         </div>

      
    </div>
  )
}
