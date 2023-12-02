import Link from "next/link";
import { ReactNode } from "react";
//import "./ui/button.css";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  href: string;
  children: ReactNode;
};

export const Button: React.FC<Props> = ({ href, children }) => {
  //probar este https://codepen.io/TrentWalton/pen/eYbMVYQ
  return (
    <Link className="no-underline max-w-fit max-h-fit " href={href}>
      {/* <div className="btn btn--wide spacing-top-sm">
        primary button
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z"
            fill="white"
          ></path>
        </svg>
      </div> */}

      <button
        aria-label="button"
        type="button"
        className="group font-semibold inline-flex mt-5 text-xl font-crimson_text
        dark:text-darkmode-text2 text-text2 items-center gap-2  
      "
      >
       
        <div className="">
        {children}
        </div>
        <div className="group-hover:translate-x-2 transition duration-500"> <FaArrowRight /></div>
      </button>
    </Link>
  );
};

{
  /* // https://codepen.io/ekaj2/pen/bGzwKoE
     <button className="
     );
    group mt-5 relative py-3 px-5 text-sm
                 hover:bg-indigo-100
                 transition-all duration-100
                 text-indigo-50 hover:text-indigo-900
                   ">
       <!-- Right border --> 
      <span className="absolute top-0 bottom-0 right-0 w-0 border-r-2 h-0 border-slate-900
                   group-hover:h-full transition-all duration-500"></span>
      <!-- Left border --> 
      <span className="absolute bottom-0 left-0 w-0 border-l-2 h-0 border-slate-900
                   group-hover:h-full transition-all duration-500"></span>
       <!-- Top border --> 
      <span className="absolute top-0 right-0 w-0 border-t-2 h-0 border-slate-900
                   group-hover:w-full transition-all duration-500"></span>
     <!-- Bottom border --> 
      <span className="absolute bottom-0 left-0 w-0 border-b-2 h-0 border-slate-900
                   group-hover:w-full transition-all duration-500"></span>
      {children}
    </button> */
}
