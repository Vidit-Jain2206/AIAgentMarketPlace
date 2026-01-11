"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { Agent } from "@repo/types";
import { getAgentDetails, getAgentsByCategory } from "@/app/api/agent";
import { motion } from "framer-motion";

import {
  LoadingState,
  NotFoundState,
  BackgroundEffects,
  HeroSection,
  OverviewSection,
  GettingStartedSection,
  InfoSection,
  QuickLinksCard,
  DetailsCard,
  StatusCard,
  SimilarAgents,
} from "./components";

const AgentPage = () => {
  const agentName = usePathname().split("/agent/")[1];
  const [agentDetails, setAgentDetails] = useState<Agent | null>(null);
  const [similarAgents, setSimilarAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchAgentDetails() {
      try {
        setLoading(true);
        const response = await getAgentDetails(agentName);
        setAgentDetails(response);

        // Fetch similar agents from the same category
        if (response?.category?.categoryKey) {
          const similar = await getAgentsByCategory(
            response.category.categoryKey
          );
          // Filter out the current agent and limit to 4
          setSimilarAgents(
            similar.filter((a: Agent) => a.agentKey !== agentName).slice(0, 4)
          );
        }

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (loading === false && !agentDetails) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-rajdhani">
      <BackgroundEffects />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 z-10">
        {/* Hero Section */}
        <HeroSection
          agentDetails={agentDetails!}
          liked={liked}
          setLiked={setLiked}
          copied={copied}
          handleCopyLink={handleCopyLink}
        />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Overview */}
            {agentDetails?.overview && (
              <OverviewSection overview={agentDetails.overview} />
            )}

            {/* Getting Started / Installation Section */}
            {agentDetails?.installationCommands &&
              agentDetails.installationCommands.length > 0 && (
                <GettingStartedSection
                  installationCommands={agentDetails.installationCommands}
                />
              )}

            {/* Other Information Sections */}
            {agentDetails?.otherInformation.map((info, index) => (
              <InfoSection
                key={info.title}
                title={info.title}
                content={info.content}
                index={index}
              />
            ))}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="space-y-6"
          >
            {/* Links Card */}
            {agentDetails?.otherLinks && agentDetails.otherLinks.length > 0 && (
              <QuickLinksCard links={agentDetails.otherLinks} />
            )}

            {/* Stats Card */}
            {agentDetails && (
              <DetailsCard
                category={agentDetails.category}
                subscriptionType={agentDetails.subscriptionType}
                openSource={agentDetails.openSource}
                tags={agentDetails.tags}
              />
            )}

            {/* Terminal-style Status Card */}
            <StatusCard createdAt={agentDetails?.createdAt} />
          </motion.div>
        </div>

        {/* Similar Agents Section */}
        {similarAgents.length > 0 && <SimilarAgents agents={similarAgents} />}
      </div>
    </div>
  );
};

export default AgentPage;
