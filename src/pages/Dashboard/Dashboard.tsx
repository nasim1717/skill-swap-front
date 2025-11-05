import SkillManagement from "@/pages/Dashboard/SkillManagement";
import { useState } from "react";
import WelcomeSection from "./WelcomeSection";
import QuickStates from "./QuickStates";
import RecentActivity from "./RecentActivity";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSkillOfferd,
  createSkillWantted,
  getSkillOfferd,
  getSkillWantted,
} from "@/services/skillService";
import { toast } from "sonner";
import { useConfirmDialog } from "@/provider/ConfirmDialogProvider";

const Dashboard = () => {
  const { confirm } = useConfirmDialog();
  // offer skill query
  const {
    data: offeredSkills,
    isLoading: isOfferdSkillLoading,
    isError: isOfferdSkillError,
    refetch: skillOfferdRefetch,
  } = useQuery({
    queryKey: ["skillsOfferd"], // unique key for cache
    queryFn: getSkillOfferd,
  });

  const { mutate: handleAddOfferedSkill, isPending: isAddOfferedSkillLoading } = useMutation({
    mutationFn: createSkillOfferd,
    onSuccess: () => {
      skillOfferdRefetch();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // wanted skill query
  const {
    data: wantedSkills,
    isLoading: isWantedSkillLoading,
    isError: isWantedSkillError,
    refetch: skillWantedRefetch,
  } = useQuery({
    queryKey: ["skillsWanted"], // unique key for cache
    queryFn: getSkillWantted,
  });

  const { mutate: handleWantedSkill, isPending: isAddWantedSkillLoading } = useMutation({
    mutationFn: createSkillWantted,
    onSuccess: () => {
      skillWantedRefetch();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const addOfferedSkill = (skillName: string) => {
    if (skillName.trim()) {
      const newSkill = skillName;
      const concatSkill = offeredSkills?.data?.skills
        ? offeredSkills?.data?.skills?.concat(",", newSkill)
        : newSkill;

      handleAddOfferedSkill({ skills: concatSkill });
    }
  };

  const addWantedSkill = (skillName: string) => {
    if (skillName.trim()) {
      const newSkill = skillName;
      const concatSkill = wantedSkills?.data?.skills
        ? wantedSkills?.data?.skills?.concat(",", newSkill)
        : newSkill;

      handleWantedSkill({ skills: concatSkill });
    }
  };

  const removeOfferedSkill = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to remove this skill?");
    if (!isConfirmed) return;
    const skillsSeperate = offeredSkills?.data?.skills?.split(",");
    const filteredSkills = skillsSeperate?.filter((_, index: number) => index.toString() !== id);
    const updatedSkills = filteredSkills?.join(",");
    handleAddOfferedSkill({ skills: updatedSkills });
  };

  const removeWantedSkill = (id: string) => {
    const isConfirmed = confirm("Are you sure you want to remove this skill?");
    if (!isConfirmed) return;
    const skillsSeperate = wantedSkills?.data?.skills?.split(",");
    const filteredSkills = skillsSeperate?.filter((_, index: number) => index.toString() !== id);
    const updatedSkills = filteredSkills?.join(",");
    handleWantedSkill({ skills: updatedSkills });
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="p-6 space-y-8">
      <WelcomeSection />

      {/* Quick Stats */}
      <QuickStates
        offeredSkills={offeredSkills?.data?.skills}
        wantedSkills={wantedSkills?.data?.skills}
      />

      {/* Quick Actions */}
      {/* <QuickActions
        generateId={generateId}
        setOfferedSkills={setOfferedSkills}
        setWantedSkills={setWantedSkills}
        offeredSkills={offeredSkills}
        wantedSkills={wantedSkills}
        handleKeyPress={handleKeyPress}
      /> */}

      {/* Skill Management Section */}
      <SkillManagement
        offeredSkills={offeredSkills?.data?.skills}
        wantedSkills={wantedSkills?.data?.skills}
        addOfferedSkill={addOfferedSkill}
        addWantedSkill={addWantedSkill}
        removeOfferedSkill={removeOfferedSkill}
        removeWantedSkill={removeWantedSkill}
        handleKeyPress={handleKeyPress}
      />

      {/* Recent Activity */}
      {/* <RecentActivity /> */}
    </div>
  );
};

export default Dashboard;
