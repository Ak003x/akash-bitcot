import React from "react";

export default function SearchBar({search,setSearch}){

  return(

   <input
   className=""
   placeholder=""
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   
   
   
   /> 
  )
}
