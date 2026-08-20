import Link from "next/link";
import RegistrationForm from "../_components/RegistrationForm";

export default function RegistrationPage() {

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="items-center justify-center p-3">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

          {/* FORM GENERIC TEXTS */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back My Deshboard!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* FORM */}
          <RegistrationForm/>

        </div>
           <div>
          <span>Are you new Register ? Please</span><Link className="p-2 bg-red-600 text-white" href={"/login"}>Login</Link>
      </div>
        </div>
     
        
      </div>
      
    </>
  );
}