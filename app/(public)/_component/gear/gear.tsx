import React from 'react'
import CardImage from '../card'
import { getGear } from '../../_action/gear'
import CardGearImage from './card'



export default async function GearPage() {
 const gear =await getGear()
 console.log(gear)
  return (
     <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center gap-4 p-4">
        {gear?.data?.map((item) => (
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
            <CardGearImage props={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
