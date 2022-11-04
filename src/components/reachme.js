import React from "react";
import { AtSymbolIcon } from "@heroicons/react/solid";
import { BsLinkedin } from 'react-icons/fa';
import { reachs } from "../data";

export default function Reachme() {
  return (
    <section id="reachme">
      <div className="container px-5 py-10 mx-auto text-center">
        <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
          Reach me
        </h1>
        <AtSymbolIcon className="w-10 inline-block mb-4" />
        <div className="flex flex-wrap m-4">
          {reachs.map((reachme) => (
            <div className="p-4 md:w-1/3 w-full">
              <div className={`h-full p-8 rounded ${reachme.name === 'Github' ? "bg-white" : "bg-gray-800 bg-opacity-40"}`}>
                <div className="inline-flex items-center object-center w-20">
                  <a href={reachme.link}>
                    <img
                      alt={reachme.name}
                      src={reachme.image}
                      className="flex-shrink-0 object-cover object-center"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
