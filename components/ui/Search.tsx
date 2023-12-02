"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = useRouter();
  const [paramsSearch, setParamsSearch] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  function handleSearch(event: { preventDefault: () => void }) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("s", searchText);
    } else {
      params.delete("s");
    }

    replace(`/search?${params.toString()}`);
    //  setParamsSearch(`/search?${params.toString()}`)
  }

  function handleResults() {
    //  router.push(`/search?${paramsSearch.toString()}`)
    router.push(paramsSearch);
  }

  return (
    <div className="relative flex flex-1 justify-center flex-shrink-0">
      <form onSubmit={handleSearch}>
        <div className="inline-flex gap-5">
        <input
          className="form-input w-96"
          placeholder={"Texto a buscar..."}
          required
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          // defaultValue={searchParams.get('s')?.toString()}
        />
        <button type="submit" className="text-2xl ml-5">
          <IoSearch />
        </button>
        </div>
      </form>
      {/* <button 
      className="text-3xl "
      onClick={handleResults}
      >Search</button> */}
    </div>
  );
}
