import { Spinner } from "@/components/ui/spinner"

const GlobalLoading = () => {
  return (
     <div className="grid justify-center items-center top-12">

      <div className=" grid justify-center items-center  gap-6">
      <h1 className="">Please wait some moment</h1>
      <Spinner className="size-10  text-pink-600" />
     
    </div>
     </div>
  )
}

export default GlobalLoading