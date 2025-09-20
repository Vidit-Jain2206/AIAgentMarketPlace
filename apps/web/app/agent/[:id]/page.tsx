"use client";
import { Button } from "@repo/ui/src/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Agent = () => {
  const agentName = usePathname().split("/agent/")[1];

  return (
    <section className="border-2 border-gray-800">
      <div className="mx-auto" style={{ width: "55%" }}>
        <div style={{ marginTop: "4rem" }} className="flex flex-col">
          {/* main row agent description */}
          <div className="w-full">
            <div
              className="grid grid-cols-3 grid-rows-2"
              style={{
                gridTemplateRows: "1fr 1fr",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <div
                className="col-span-2 row-span-2 flex flex-col gap-4 border border-gray-900 rounded-lg"
                style={{ gridColumn: "1 / span 2", gridRow: "1 / span 2" }}
              >
                {/* logo name like */}
                {/* tagline */}
                {/* description */}
                <div className="flex flex-col p-6">
                  <div className="flex flex-row justify-between items-center">
                    {/* logo + name */}
                    <div className="flex flex-row">
                      <Image
                        src=""
                        alt=""
                        width={32}
                        height={32}
                        className="border-2 border-red-300"
                      />
                      <h1 className="text-2xl font-bold text-white ml-4">
                        {agentName}
                      </h1>
                    </div>
                    {/* like button */}
                    {/* <div>
                      <Button className="ml-4">Like</Button>
                    </div> */}
                  </div>
                  <p className="text-gray-400 mt-[4px] tracking-tighter leading-tight text-[0.85rem]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Esse, atque.
                  </p>

                  <p
                    style={{ marginTop: "2.5rem" }}
                    className="mt-8 text-white text-[1rem] "
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam ducimus assumenda rerum velit sed illo commodi
                    consequuntur, itaque quas tempore dignissimos maiores
                    doloremque!
                  </p>
                </div>
                {/* visit url button */}
                <hr className="bg-gray-900" />
                <div className="px-6 py-4">
                  <Button
                    style={{ backgroundColor: "white" }}
                    className="text-black bg-white! px-4 py-2 text-lg rounded-full"
                  >
                    Visit Website
                  </Button>
                </div>
              </div>
              <div className="col-span-1 row-span-1 text-white border border-gray-900 p-6 rounded-lg">
                <h2 className="text-white text-lg font-semibold">Links</h2>
                <ul className="flex flex-col gap-1 mt-4">
                  <li className="text-white text-sm">Link 1</li>
                  <li className="text-white text-sm">Link 2</li>
                </ul>
              </div>
              <div className="col-span-1 row-span-1 text-white border border-gray-900 p-6 rounded-lg">
                Details
              </div>
            </div>
          </div>
          {/* main row agent description */}
        </div>
      </div>
    </section>
  );
};

export default Agent;
