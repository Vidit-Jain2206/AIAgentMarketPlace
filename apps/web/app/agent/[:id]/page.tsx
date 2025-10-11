"use client";
import { Button } from "@repo/ui/src/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Agent } from "@repo/types";
import { getAgentDetails } from "@/app/api/agent";
import Link from "next/link";

const Agent = () => {
  const agentName = usePathname().split("/agent/")[1];
  const [agentDetails, setAgentDetails] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch agent details using the agentName
    // Example: fetch(`/api/agents/${agentName}`).then(...);
    async function fetchAgentDetails() {
      try {
        setLoading(true);
        const response = await getAgentDetails(agentName);
        setAgentDetails(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching agent details:", error);
      }
    }
    if (agentName) {
      fetchAgentDetails();
    }
  }, [agentName]);

  console.log("loading", loading);
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  if (loading === false && !agentDetails) {
    return <div className="text-white">No Agent Found ...</div>;
  }
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
                        src={""}
                        alt="agent logo"
                        width={32}
                        height={32}
                        className="border-2 border-red-300"
                      />
                      <h1 className="text-2xl font-bold text-white ml-4">
                        {agentDetails?.agentName}
                      </h1>
                    </div>
                    {/* like button */}
                    {/* <div>
                      <Button className="ml-4">Like</Button>
                    </div> */}
                  </div>
                  <p className="text-gray-400 mt-[4px] tracking-tighter leading-tight text-[0.85rem]">
                    {agentDetails?.tagline}
                  </p>

                  <p
                    style={{ marginTop: "2.5rem" }}
                    className="mt-8 text-white text-[1rem] "
                  >
                    {agentDetails?.shortDescription}
                  </p>
                </div>
                {/* visit url button */}
                <hr className="bg-gray-900" />
                <div className="px-6 py-4">
                  <Link
                    href={agentDetails?.agentLink || "#"}
                    style={{ backgroundColor: "white" }}
                    className="text-black bg-white! px-4 py-2 text-lg rounded-full"
                  >
                    Visit Website
                  </Link>
                </div>
              </div>
              <div className="col-span-1 row-span-1 text-white border border-gray-900 p-6 rounded-lg">
                <h2 className="text-white text-lg font-semibold">Links</h2>
                <ul className="flex flex-col gap-1 mt-4">
                  {agentDetails?.otherLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 row-span-1 text-white border border-gray-900 p-6 rounded-lg">
                Details
              </div>
            </div>
          </div>
          {/* main row agent description */}
        </div>

        <div className="mt-4 flex flex-col">
          {agentDetails?.overview && (
            <div className="flex flex-col">
              <h2 className="text-white text-2xl font-bold mb-2">Overview</h2>
              <p className="text-white text-[1rem]">
                {agentDetails?.overview || "No overview available."}
              </p>
            </div>
          )}

          {/* other information sections */}
          {agentDetails?.otherInformation.map((info) => (
            <div key={info.title} className="mt-10">
              {/* Main Section Title */}
              <h2 className="text-white text-2xl font-bold mb-2">
                {info.title}
              </h2>

              {/* Subpoints */}
              <ul className="space-y-2 ml-4">
                {info.content.map((contentItem) => (
                  <li key={contentItem.subHeading}>
                    {/* Subheading */}
                    <h3 className="text-white text-[1rem]">
                      <span className="mr-2 text-white text-[1.4rem]">•</span>
                      {contentItem.subHeading}
                    </h3>

                    {/* Sub Descriptions */}
                    {Array.isArray(contentItem.subDescription) &&
                      contentItem.subDescription.length > 0 && (
                        <ul className="list-disc list-inside ml-6 space-y-1">
                          {contentItem.subDescription.map((desc, index) => (
                            <li
                              key={index}
                              className="text-gray-300 leading-relaxed"
                            >
                              {desc}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agent;
