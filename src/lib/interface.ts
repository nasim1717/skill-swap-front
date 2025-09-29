export interface Skill {
    id: string;
    name: string;
    category?: string;
};

export interface SkillManagementProps {
    offeredSkills: Skill[];
    wantedSkills: Skill[];
    addOfferedSkill: (skillName: string) => void;
    addWantedSkill: (skillName: string) => void;
    removeOfferedSkill: (id: string) => void;
    removeWantedSkill: (id: string) => void;
    handleKeyPress: (e: React.KeyboardEvent, action: () => void) => void;
}