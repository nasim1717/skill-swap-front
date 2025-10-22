import { useAuthContext } from "@/hooks/useAuthContext";

export default function WelcomeSection() {
  const { user } = useAuthContext();
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Ready to continue your learning journey? Connect with other learners and share your
        expertise.
      </p>
    </div>
  );
}
