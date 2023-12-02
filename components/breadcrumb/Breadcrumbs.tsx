"use client";

import { humanize } from "@/lib/textConverter";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useState } from "react";

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  

  const paths = pathname.split("/").filter((x) => x);
  // const searchParams = useSearchParams()
  // const searchQuery= searchParams.get('s')
  //  console.log("search params:", searchQuery)
  
  let parts = [
    {
      label: "Home",
      href: "/",
      "aria-label": pathname === "/" ? "page" : undefined,
    },
  ];

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`;
    label !== "page" &&
      parts.push({
        label: humanize(label.replace(/[-_]/g, " ")) || "",
        href,
        "aria-label": pathname === href ? "page" : undefined,
      });
  });

  const [homeActive, setHomeActive] = useState(parts.length === 1)
  // console.log(homeActive)

  // console.log(parts.length, "❤")
  // setHomeActive(parts.length === 1)
  // console.log(homeActive)

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <div className="py-5 inline-flex items-center list-none" role="">
       <div className={`  flex items-center
       ${homeActive ? 'text-text2 dark:text-darkmode-text2' : 'text-black dark:text-white'}
       `}> <FaHome /></div>
        {parts.map(({ label, ...attrs }, index) => (
         
          <li className="mx-1 capitalize flex items-center" role="listitem" key={index}>
            {index > 0 && <span className=" inline-block mr-1"><MdKeyboardArrowRight/></span>}
            {index !== parts.length - 1 ? (
              <Link
                className="hover:text-text2 dark:hover:text-darkmode-text2
                text-sm no-underline text-black dark:text-white "
                {...attrs}
              >
                {label}
              </Link>
            ) : (
              <span className="text-sm text-text2 dark:text-darkmode-text2 ">
                {label}
              </span>
            )}
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
