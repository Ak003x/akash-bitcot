import React from "react";

export default function SearchBar({search,setSearch}){

  return(

   <input
   className="w-full p-2 my-3 rounded border border-black"
   placeholder="Search Contact"
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   
   
   
   /> 
  )
}
