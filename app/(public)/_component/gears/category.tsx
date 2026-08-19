import React from 'react'
import CardImage from '../card'
import { ICategory } from '@/lib/types'
import { getGearCategory } from '@/app/(dashboardGroup)/dashboard/_action/gearGet'


export default async function CategoryPage() {
 const category =await getGearCategory()
 console.log(category)
  return (
     <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center gap-4 p-4">
        {category?.data?.map((item:ICategory) => (
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
            <CardImage props={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
