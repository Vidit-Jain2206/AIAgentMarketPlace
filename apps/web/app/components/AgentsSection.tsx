import { Button } from "@repo/ui/src/components/ui/button";
import { Card, CardContent } from "@repo/ui/src/components/ui/card";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import DropdownSelect from "./DropDownMenu";
import Image from "next/image";
import { fetchAllCategories } from "../api/category";
import { Agent, Category } from "@repo/types";
import { getAgentsByCategory, getAllAgents } from "../api/agent";
const agentsLimitPerPage = 9;
const AgentsSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [sortBy, setSortBy] = useState("Filter By");
  const [agentsList, setAgentsList] = useState<Agent[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // Fetch categories from the backend API
    setLoading(true);
    async function fetchCategories() {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    async function fetchAllAgents() {
      try {
        const response = await getAllAgents();
        setAgentsList(response);
      } catch (error) {
        console.error("Error fetching agents by category:", error);
      }
    }
    const promiseObjects = [fetchCategories(), fetchAllAgents()];
    Promise.all(promiseObjects)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    async function fetchAgentsByCategory(category: string) {
      try {
        const response = await getAgentsByCategory(category);
        setAgentsList(response);
      } catch (error) {
        console.error("Error fetching agents by category:", error);
      }
    }
    if (selectedCategory && selectedCategory !== "Category") {
      fetchAgentsByCategory(selectedCategory);
    } else {
      fetchAgentsByCategory("");
    }
  }, [selectedCategory]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div className="border-2 border-gray-800 rounded-lg flex flex-col text-white w-[70%] mx-auto">
      {/*filter buttons */}
      <section className="border-2 border-gray-800 w-full mb-6 flex justify-end">
        <div className="border-2 border-gray-800 w-[40%] flex gap-2">
          <div className="w-[50%] text-white">
            <DropdownSelect
              options={categories.map((cat: Category) => {
                return {
                  key: cat.categoryKey,
                  value: cat.categoryName,
                };
              })}
              selectedState={selectedCategory}
              setSelectedState={setSelectedCategory}
              defaultValue="Category"
            />
          </div>
          <div className="w-[50%] text-white">
            <DropdownSelect
              options={[
                {
                  key: "A-Z",
                  value: "A-Z",
                },
                {
                  key: "Z-A",
                  value: "Z-A",
                },
                {
                  key: "Newest",
                  value: "Newest",
                },
                {
                  key: "Oldest",
                  value: "Oldest",
                },
              ]}
              defaultValue="Sort By"
              selectedState={sortBy}
              setSelectedState={setSortBy}
            />
          </div>
        </div>
      </section>

      {/* agents grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 mt-6">
        {agentsList
          .slice(
            agentsLimitPerPage * pageIndex,
            agentsLimitPerPage * (pageIndex + 1)
          )
          .map((agent) => (
            <Card
              key={agent.agentName}
              onClick={() => {
                router.push(`/agent/${agent.agentKey}`);
              }}
              className=" border-gray-900 bg-[#070708] hover:shadow-xl hover:scale-105 hover:border-white transition h-[230px] flex flex-col justify-between items-center rounded-xl cursor-pointer"
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
                  <h2 className="text-xl font-semibold">{agent.agentName}</h2>
                  <p className="mt-[-5px] text-gray-400 text-sm">
                    {agent.tagline}
                  </p>
                </div>
              </CardContent>
              <hr className="h-[1px] w-full border-gray-900" />
              <CardContent className="w-full py-0! h-[27%] flex flex-col justify-center items-center">
                <div className="w-full flex flex-row items-center justify-between">
                  {/* tags */}
                  <div className="w-[70%] flex flex-row items-start justify-start gap-2">
                    <p className="text-xs text-white bg-black border border-gray-800 px-[8px] py-[4px] rounded-lg ">
                      {agent.category.categoryName}
                    </p>
                    <p className="text-xs text-white bg-black border border-gray-800 px-[8px] py-[4px] rounded-lg ">
                      {agent.subscriptionType[0]}
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
          <Button
            onClick={() => setPageIndex((state) => state - 1)}
            disabled={pageIndex === 0}
            variant={"outline"}
            className={`cursor-pointer ${pageIndex === 0 ? " border-gray-500 text-gray-300 cursor-not-allowed" : ""}`}
          >
            Previous
          </Button>
          <Button
            // when disable change the colour to gray
            className={`ml-4 cursor-pointer ${(pageIndex + 1) * agentsLimitPerPage >= agentsList.length ? " border-gray-500 text-gray-300 cursor-not-allowed" : ""}`}
            variant={"outline"}
            disabled={(pageIndex + 1) * agentsLimitPerPage >= agentsList.length}
            onClick={() => setPageIndex((state) => state + 1)}
          >
            Next
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgentsSection;
