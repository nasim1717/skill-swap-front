import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CtaSection() {
  const navigate = useNavigate();
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Start Your Skill Exchange Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners and teachers in our growing community.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="text-lg">
            Join SkillSwap Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
