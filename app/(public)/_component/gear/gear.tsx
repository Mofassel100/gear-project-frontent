
import { getGear } from '../../_action/gear'
import CardGearImage from './card'
import { IGearItem } from '@/lib/types'



export default async function GearPage() {
 const gear =await getGear()

  return (
     <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center gap-4 p-4">
        {gear?.data?.map((item:IGearItem) => (
          <div
            key={item.id}
           
          >
            <CardGearImage props={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
