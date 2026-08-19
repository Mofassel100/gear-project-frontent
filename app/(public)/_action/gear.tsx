



/*

    data : {
        title
        conten
    }
*/
export  const getGear = async (
) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
console.log(res)
  const result = await res.json();
  return result;
};



