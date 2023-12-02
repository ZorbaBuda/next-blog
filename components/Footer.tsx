"use client";

import Logo from "@/components/Logo";

import config from "@/data/config.json";
import menu from "@/data/menu.json";
import { markdownify } from "@/lib/textConverter";
import Link from "next/link";
import BrandTitle from "./BrandTitle";

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="bg-bg_partials dark:bg-darkmode-bg_partials mt-10
    border-t   dark:border-[#3E3E3E] border-black
    ">
     
     <div className="flex flex-col justify-center">
        <div className=" min-w-full   items-center py-5 flex justify-around ">
           <BrandTitle />
          <div className="flex items-center font-open_sans
          
            ">
            <ul>
              {menu.footer.map((menu) => (
                <li className="m-3 inline-block hover:text-text2 dark:hover:text-darkmode-text2" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right">
            <div>social Icons</div>
          </div> */}
        
      </div>
      </div>
      <div className="flex justify-center   py-7 ">
        <div className="gap-x-3 container flex justify-center text-[#B4AFB6] dark:text-darkmode-light">
        <div>Primal Blog</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
