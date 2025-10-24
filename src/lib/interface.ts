export interface Skill {
    id: string;
    name: string;
    category?: string;
};

export interface SkillManagementProps {
    offeredSkills: string;
    wantedSkills: string;
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
    reviewed_user_id: string;
    reviewer_id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer: Record<string, unknown>;
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
};

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    isRead: boolean;
}

export interface Conversation {
    id: string;
    userName: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
}