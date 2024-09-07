import { useState } from "react";
import { Link } from "react-router-dom";

export default function Fbar() {
  return (
    <>
    <div className="min-h-[55px] flex justify-center my-5 ">
      <div className="flex w-[20em] md:w-[30em] justify-center rounded-xl items-center gap-[8em] p-5 border border-white/10 shadow-lg backdrop-blur-sm bg-white/10">
        <button className="bg-white/10 text-white border border-white/15 border-b-4 border-t-1 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-white shadow-white absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <Link to={"/notes"}>My Notes</Link>
        </button>
        <button className=" bg-white/10 text-white border border-white/15 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-white shadow-white absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <Link to={"/"}>Add Notes</Link>
        </button>
      </div>

    </div>
    </>
  );
}
