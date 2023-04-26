import { useState } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const pathname = useLocation().pathname;
  const bgColor = pathname === "/favorites" ? "bg-secondary" : "bg-primary";

  function getTitle() {
    if (pathname === "/") return "Notes";
    if (pathname === "/favorites") return "Favorites";
    return "Creating Note";
  }

  return (
    <>
      <header className={`rounded-b-3xl p-4 pt-10 min-h-[150px] ${bgColor}`}>
        <h1 className="my-2 font-bold text-3xl">{getTitle()}</h1>
        {getTitle() !== "Creating Note" ? (
          <Searchbar value={searchValue} onChange={setSearchValue} />
        ) : (
          <p className="leading-none">
            Keep your notes organized in beautiful and simple way
          </p>
        )}
      </header>
      <Outlet context={searchValue} />
    </>
  );
}

export function useSearchValue() {
  return useOutletContext<string>();
}
