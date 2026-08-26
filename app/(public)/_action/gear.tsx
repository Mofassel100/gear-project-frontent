




/*

    data : {
        title
        conten
    }
*/
export  const getGear = async (

) => {
  

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`,{
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
   
  });

  const result = await res.json();
 
  return result;
};



