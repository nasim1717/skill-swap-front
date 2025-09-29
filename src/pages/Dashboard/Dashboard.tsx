import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SkillManagement from "@/pages/Dashboard/SkillManagement";
import { useState } from "react";
import WelcomeSection from "./WelcomeSection";
import QuickStates from "./QuickStates";
import QuickActions from "./QuickActions";
import { Skill } from "@/lib/interface";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  // Skills state
  const [offeredSkills, setOfferedSkills] = useState<Skill[]>([
    { id: "1", name: "React Development", category: "Frontend" },
    { id: "2", name: "UI/UX Design", category: "Design" },
  ]);
  const [wantedSkills, setWantedSkills] = useState<Skill[]>([
    { id: "3", name: "Python", category: "Backend" },
    { id: "4", name: "Machine Learning", category: "AI/ML" },
  ]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addOfferedSkill = (skillName: string) => {
    if (skillName.trim()) {
      const newSkill: Skill = {
        id: generateId(),
        name: skillName.trim(),
      };
      setOfferedSkills([...offeredSkills, newSkill]);
    }
  };

  const addWantedSkill = (skillName: string) => {
    if (skillName.trim()) {
      const newSkill: Skill = {
        id: generateId(),
        name: skillName.trim(),
      };
      setWantedSkills([...wantedSkills, newSkill]);
    }
  };

  const removeOfferedSkill = (id: string) => {
    setOfferedSkills(offeredSkills.filter((skill) => skill.id !== id));
  };

  const removeWantedSkill = (id: string) => {
    setWantedSkills(wantedSkills.filter((skill) => skill.id !== id));
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
      <QuickStates offeredSkills={offeredSkills} wantedSkills={wantedSkills} />

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
        offeredSkills={offeredSkills}
        wantedSkills={wantedSkills}
        addOfferedSkill={addOfferedSkill}
        addWantedSkill={addWantedSkill}
        removeOfferedSkill={removeOfferedSkill}
        removeWantedSkill={removeWantedSkill}
        handleKeyPress={handleKeyPress}
      />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
