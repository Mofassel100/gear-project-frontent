import React from 'react'

import { SiteFooter } from '@/components/shared/footer'
import { RentalTableDemo } from '../_components/AllRentals'


function CustomerPage() {
 
  return (
    <div>

    <div className="w-full gap-4 p-4">
      <RentalTableDemo></RentalTableDemo>
      
      {/* <ResizableDemo></ResizableDemo>*/}
      </div> 
    <SiteFooter></SiteFooter>
    </div>
  )
}

export default CustomerPage