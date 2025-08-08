
import { apiconnector } from "../apiconnector";
import { catalogData } from "../apis";


export const getCatalogPagedata = async(categoryId)=>{
   
  let result = []
   
  try {
    
   const response = await apiconnector("POST" , catalogData.CATALOGPAGEDATA_API  , {categoryId : categoryId})
    if(!response?.data?.success){
        throw new Error(response?.data?.message || "Failed to fetch category details"); 
    
    }
      result = response.data.data

  } catch (error) {
     
    console.log("CATALOG PAGE DATA API ERROR....", error);
    

  }

  return result;

}  
