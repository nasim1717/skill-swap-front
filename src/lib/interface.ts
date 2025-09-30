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
};

export interface UserProfile {
    name: string;
    email: string;
    bio: string;
    location: string;
    joinDate: string;
    profilePicture?: string;
};

export interface Review {
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
    skill: string;
};

export interface User {
    id: string;
    name: string;
    avatar?: string;
    offeredSkills: string[];
    wantedSkills: string[];
    rating: number;
    location: string;
    matchScore: number;
}