import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skill } from "@/lib/interface";

export default function QuickActions({
  generateId,
  setOfferedSkills,
  setWantedSkills,
  offeredSkills,
  wantedSkills,
  handleKeyPress,
}) {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");
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

  return (
    <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump into your most common tasks</CardDescription>
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
                <DialogDescription>Add a skill you can offer or want to learn</DialogDescription>
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
                    <Button variant="outline" onClick={() => setIsAddSkillModalOpen(false)}>
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
                    <Button variant="outline" onClick={() => setIsAddSkillModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddWantedSkill} disabled={!newWantedSkill.trim()}>
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
  );
}
