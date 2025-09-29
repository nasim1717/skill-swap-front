import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Exchange Skills,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Build Communities
            </span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
            Connect with like-minded individuals to teach what you know and learn what you need.
            Join thousands of people growing together through skill sharing.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="text-lg">
              Start Swapping Skills
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
