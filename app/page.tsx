import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { ScrollAreaHorizontalDemo } from "./(public)/_component/scroller";



export default async function  Home() {
   const user = await getMe();
  return (
    
  
  <div className="text-red-800 justify-center">
    <Navbar user={user}></Navbar>
<ScrollAreaHorizontalDemo></ScrollAreaHorizontalDemo>
    
    My name is sifat</div>
  );
}
