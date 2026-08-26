import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

;

import { GearCarousel } from "@/components/scroller";
import CategoryPage from "./(public)/_component/gears/category";
import GearPage from "./(public)/_component/gear/gear";
import { SiteFooter } from "@/components/shared/footer";








export default async function  Home() {
   const user = await getMe();
  return (
    
   <div><Navbar user={user}></Navbar>
  <div className="text-red-800 justify-center">
    <GearCarousel></GearCarousel>
<div className="justify-center text-center p-2 m-1 text-4xl">All gears Catagory</div>
<CategoryPage></CategoryPage>

<div className="justify-center text-center p-2 m-1 text-4xl">All gears</div>
<GearPage ></GearPage>  
    </div>
    <SiteFooter></SiteFooter>
    </div>
  );
}
