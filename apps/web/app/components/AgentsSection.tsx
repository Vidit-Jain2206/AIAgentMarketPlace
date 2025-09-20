import { Button } from "@repo/ui/src/components/ui/button";
import { Card, CardContent } from "@repo/ui/src/components/ui/card";
import { Link } from "lucide-react";

import React, { useEffect } from "react";
import DropdownSelect from "./DropDownMenu";
import Image from "next/image";
import { fetchAllCategories } from "../api/category";
const agents = [
  {
    id: 1,
    name: "ChatGPT",
    desc: "Conversational AI assistant  Lorem ipsum dolor, sit amet consectetur adipisicing ",
    category: "General",
  },
  {
    id: 2,
    name: "Claude",
    desc: "Anthropic’s helpful assistant lorem ipsum dolor sit amet.",
    category: "General",
  },
  {
    id: 3,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 4,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 5,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 6,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 7,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 8,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
  {
    id: 9,
    name: "Perplexity",
    desc: "AI powered search assistant lorem ipsum dolor sit amet.",
    category: "Research",
  },
];

const AgentsSection = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("Category");
  const [sortBy, setSortBy] = React.useState("Filter By");

  useEffect(() => {
    // Fetch categories from the backend API
    fetchAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="border-2 border-gray-800 rounded-lg flex flex-col text-white w-[70%] mx-auto">
      {/*filter buttons */}
      <section className="border-2 border-gray-800 w-full mb-6 flex justify-end">
        <div className="border-2 border-gray-800 w-[40%] flex gap-2">
          <div className="w-[50%] text-white">
            <DropdownSelect
              options={categories.map((cat: any) => cat.name)}
              selectedState={category}
              setSelectedState={setCategory}
              defaultValue="Category"
            />
          </div>
          <div className="w-[50%] text-white">
            <DropdownSelect
              options={["Popularity", "Newest", "Top Rated"]}
              defaultValue="Sort By"
              selectedState={sortBy}
              setSelectedState={setSortBy}
            />
          </div>
        </div>
      </section>

      {/* agents grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 mt-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className=" border-gray-900 bg-[#070708] hover:shadow-xl hover:scale-105 hover:border-white transition h-[230px] flex flex-col justify-between items-center rounded-xl"
          >
            <CardContent className=" h-[73%] w-full">
              {/* logo */}
              {/* AgentName */}
              {/* tagline */}
              <div className="flex flex-col justify-between items-start gap-3">
                <Image
                  src=""
                  alt=""
                  height={24}
                  width={24}
                  className="border-2 border-red-300"
                />
                <h2 className="text-xl font-semibold">{agent.name}</h2>
                <p className="mt-[-5px] text-gray-400 text-sm">{agent.desc}</p>
              </div>
            </CardContent>
            <hr className="h-[1px] w-full border-gray-900" />
            <CardContent className="w-full py-0! h-[27%] flex flex-col justify-center items-center">
              <div className="w-full flex items-center justify-between">
                {/* tags */}
                <div className="w-[70%] flex flex-row items-start justify-start flex-wrap gap-2">
                  <p className="text-xs text-white bg-black border border-gray-800 px-[8px] py-[4px] rounded-lg ">
                    {agent.category}
                  </p>
                  <p className="text-xs text-white bg-black border border-gray-800 px-[8px] py-[4px] rounded-lg ">
                    {agent.category}
                  </p>
                </div>
                {/* link */}
                <div className="w-[10%] flex items-center justify-end p-1">
                  <Link href="/" className="text-white text-sm">
                    <Image src="" alt="" width={16} height={16} />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* pagination */}
      <section className="flex justify-center my-8">
        {/* Pagination */}
        <div className="flex justify-center py-6">
          <Button variant="outline">Previous</Button>
          <Button className="ml-4">Next</Button>
        </div>
      </section>
    </div>
  );
};

export default AgentsSection;
