import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";


export default async function HomePage() {
const user = await getMe()


  return (
    <div>
      <Navbar user={user}></Navbar>
      
      Hello, Next.js!

      <Button
      size={"xs"}
      variant={"destructive"}
      >
        Click Me
      </Button>
    </div>
  );
}