"use server"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}

export const RegistrationAction = async (prevState : LoginState , formData: FormData) => {
    const name  = formData.get("name")
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role")
console.log(name,role,email,password)
    const payload = {
        name,
        email,
        role,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();
    

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });
 const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(decodedToken.role === "Customer"){
            redirect("/dashboard/customer");
        } else if (decodedToken.role === "Admin"){
            redirect("/dashboard/admin");
        } else if (decodedToken.role === "Provider"){
            redirect("/dashboard/provider");
        }
    }

    return result
}