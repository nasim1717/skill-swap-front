import { Users, MessageSquare, BookOpen, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillManagement from "@/components/SkillManagement";
import { useState } from "react";

interface Skill {
  id: string;
  name: string;
  category?: string;
}

const Dashboard = () => {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");
  
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

  const handleAddOfferedSkill = () => {
    if (newOfferedSkill.trim()) {
      const newSkill: Skill = {
        id: generateId(),
        name: newOfferedSkill.trim(),
      };
      setOfferedSkills([...offeredSkills, newSkill]);
      setNewOfferedSkill("");
      setIsAddSkillModalOpen(false);
    }
  };

  const handleAddWantedSkill = () => {
    if (newWantedSkill.trim()) {
      const newSkill: Skill = {
        id: generateId(),
        name: newWantedSkill.trim(),
      };
      setWantedSkills([...wantedSkills, newSkill]);
      setNewWantedSkill("");
      setIsAddSkillModalOpen(false);
    }
  };

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
    setOfferedSkills(offeredSkills.filter(skill => skill.id !== id));
  };

  const removeWantedSkill = (id: string) => {
    setWantedSkills(wantedSkills.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };
  const stats = [
    {
      title: "Skills Offered",
      value: offeredSkills.length.toString(),
      description: "Active skills you can teach",
      icon: BookOpen,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Skills Learning",
      value: wantedSkills.length.toString(), 
      description: "Skills you want to learn",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10", 
      borderColor: "border-primary/20",
    },
    {
      title: "Active Matches",
      value: "12",
      description: "Current learning partnerships",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Messages",
      value: "23",
      description: "Unread conversations",
      icon: MessageSquare,
      color: "text-foreground",
      bgColor: "bg-muted",
      borderColor: "border-border",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome back, John!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ready to continue your learning journey? Connect with other learners and share your expertise.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-md border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your most common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Dialog open={isAddSkillModalOpen} onOpenChange={setIsAddSkillModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Skill</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Skill</DialogTitle>
                  <DialogDescription>
                    Add a skill you can offer or want to learn
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="offered" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="offered">I Can Offer</TabsTrigger>
                    <TabsTrigger value="wanted">I Want to Learn</TabsTrigger>
                  </TabsList>
                  <TabsContent value="offered" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="offered-skill">Skill you can teach</Label>
                      <Input
                        id="offered-skill"
                        placeholder="e.g., JavaScript, Graphic Design..."
                        value={newOfferedSkill}
                        onChange={(e) => setNewOfferedSkill(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleAddOfferedSkill)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddSkillModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="success"
                        onClick={handleAddOfferedSkill}
                        disabled={!newOfferedSkill.trim()}
                      >
                        Add Skill
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="wanted" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wanted-skill">Skill you want to learn</Label>
                      <Input
                        id="wanted-skill"
                        placeholder="e.g., Python, Photography..."
                        value={newWantedSkill}
                        onChange={(e) => setNewWantedSkill(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, handleAddWantedSkill)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddSkillModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddWantedSkill}
                        disabled={!newWantedSkill.trim()}
                      >
                        Add Skill
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Find Matches</span>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>View Messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skill Management Section */}
      <SkillManagement 
        offeredSkills={offeredSkills}
        wantedSkills={wantedSkills}
        addOfferedSkill={addOfferedSkill}
        addWantedSkill={addWantedSkill}
        removeOfferedSkill={removeOfferedSkill}
        removeWantedSkill={removeWantedSkill}
      />

      {/* Recent Activity */}
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest interactions and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              user: "Sarah Chen",
              action: "wants to learn React from you",
              time: "2 hours ago",
              type: "match"
            },
            {
              user: "Mike Johnson", 
              action: "sent you a message about Python tutoring",
              time: "5 hours ago",
              type: "message"
            },
            {
              user: "Emma Davis",
              action: "accepted your request to learn Photography",
              time: "1 day ago", 
              type: "accepted"
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-smooth">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;