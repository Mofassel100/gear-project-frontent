import { isAccessTokenExist } from "@/service/refreshToken";




/*

    data : {
        title
        conten
    }
*/
export  const getGear = async (

) => {
const accessToken = await isAccessTokenExist()
  

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`,{
    credentials:"include",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
   
  });

  const result = await res.json();
 
  return result;
};



