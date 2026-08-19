import React from 'react'
import { ResizableDemo } from '../_components/ReSizableHome'
import { SiteFooter } from '@/components/shared/footer'

function CustomerPage() {
  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center gap-4 p-4"><ResizableDemo></ResizableDemo></div>
    <SiteFooter></SiteFooter>
    </div>
  )
}

export default CustomerPage