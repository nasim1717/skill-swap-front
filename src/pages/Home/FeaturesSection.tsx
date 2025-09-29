import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Trophy, Star } from "lucide-react";
export default function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Find Perfect Matches",
      description: "Connect with learners and mentors based on complementary skills and interests.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description:
        "Communicate instantly with your skill swap partners through our integrated messaging system.",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description:
        "Monitor your learning journey and celebrate achievements with our progress tracking.",
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Build trust in the community through transparent ratings and reviews system.",
    },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose SkillSwap?
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes skill sharing simple, effective, and rewarding for everyone involved.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
