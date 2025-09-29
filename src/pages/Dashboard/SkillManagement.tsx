import { useState } from "react";
import { Plus, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SkillManagementProps } from "@/lib/interface";

const SkillManagement = ({
  offeredSkills,
  wantedSkills,
  addOfferedSkill,
  addWantedSkill,
  removeOfferedSkill,
  removeWantedSkill,
  handleKeyPress,
}: SkillManagementProps) => {
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");

  const handleAddOfferedSkill = () => {
    if (newOfferedSkill.trim()) {
      addOfferedSkill(newOfferedSkill.trim());
      setNewOfferedSkill("");
    }
  };

  const handleAddWantedSkill = () => {
    if (newWantedSkill.trim()) {
      addWantedSkill(newWantedSkill.trim());
      setNewWantedSkill("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Manage Your Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Update your skill profile to connect with the right learning partners
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills I Can Offer */}
        <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <Tag className="w-5 h-5" />
              <span>Skills I Can Offer</span>
            </CardTitle>
            <CardDescription>Share the skills you can teach others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="offered-skill" className="sr-only">
                  Add a skill you can offer
                </Label>
                <Input
                  id="offered-skill"
                  placeholder="e.g., JavaScript, Graphic Design..."
                  value={newOfferedSkill}
                  onChange={(e) => setNewOfferedSkill(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddOfferedSkill)}
                  className="transition-all duration-smooth"
                />
              </div>
              <Button
                onClick={handleAddOfferedSkill}
                variant="success"
                size="icon"
                disabled={!newOfferedSkill.trim()}
                className={cn(
                  "shrink-0 transition-all duration-smooth",
                  !newOfferedSkill.trim() && "opacity-50 cursor-not-allowed"
                )}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {offeredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {offeredSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="flex items-center space-x-2 px-3 py-1 text-sm bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-all duration-smooth"
                    >
                      <span>{skill.name}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeOfferedSkill(skill.id)}
                        className="w-4 h-4 p-0 hover:bg-transparent text-success hover:text-success/70"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  No skills added yet. Add your first skill above!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills I Want to Learn */}
        <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Tag className="w-5 h-5" />
              <span>Skills I Want to Learn</span>
            </CardTitle>
            <CardDescription>Specify the skills you'd like to learn from others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="wanted-skill" className="sr-only">
                  Add a skill you want to learn
                </Label>
                <Input
                  id="wanted-skill"
                  placeholder="e.g., Python, Photography..."
                  value={newWantedSkill}
                  onChange={(e) => setNewWantedSkill(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddWantedSkill)}
                  className="transition-all duration-smooth"
                />
              </div>
              <Button
                onClick={handleAddWantedSkill}
                size="icon"
                disabled={!newWantedSkill.trim()}
                className={cn(
                  "shrink-0 transition-all duration-smooth",
                  !newWantedSkill.trim() && "opacity-50 cursor-not-allowed"
                )}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {wantedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {wantedSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="flex items-center space-x-2 px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-smooth"
                    >
                      <span>{skill.name}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeWantedSkill(skill.id)}
                        className="w-4 h-4 p-0 hover:bg-transparent text-primary hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  No skills added yet. Add your first skill above!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        {/* <Button variant="outline" size="lg">
          Save as Draft
        </Button> */}
        <Button size="lg">Update Profile</Button>
      </div>
    </div>
  );
};

export default SkillManagement;
