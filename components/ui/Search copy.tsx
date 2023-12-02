'use client';

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";


export default function Search() {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { replace } = useRouter()
  const [paramsSearch, setParamsSearch] = useState<string>('')

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('s', term);
    } else {
      params.delete('s');
    }
    replace(`/search?${params.toString()}`)
    setParamsSearch(`/search?${params.toString()}`)
  }

  function handleResults(){
    //  router.push(`/search?${paramsSearch.toString()}`)
     router.push(paramsSearch)
  }

  return (
    <div className="relative flex flex-1 justify-center flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search {searchParams}
      </label>
      <input
        className="max-w-2xl peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={'Buscar por tags, categoria, resumen'}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('s')?.toString()}
        required
      />
      <button type="submit" className="text-2xl ml-5"><IoSearch/></button>
      {/* <button 
      className="text-3xl "
      onClick={handleResults}
      >Search</button> */}
    </div>
  );
}