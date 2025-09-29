import { Handshake } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillSwap. Built with ❤️ for the learning community.
          </p>
        </div>
      </div>
    </footer>
  );
}
