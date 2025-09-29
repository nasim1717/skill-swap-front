import heroImage from "@/assets/skillswap-hero.jpg";
import Logo from "../../../assets/icon.png";
export default function HeroSection() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="relative z-10 flex flex-col justify-center p-12 text-white">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <img src={Logo} className=" text-white" />
          </div>
          <h1 className="text-3xl font-bold">SkillSwap</h1>
        </div>
        <h2 className="text-4xl font-bold mb-6 leading-tight">
          Connect, Learn, and Share Your Skills
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join a community of learners and teachers. Exchange knowledge, grow together, and discover
          new possibilities.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">✓</span>
            </div>
            <span>Find perfect skill matches</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">✓</span>
            </div>
            <span>Learn from experienced mentors</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">✓</span>
            </div>
            <span>Share your expertise with others</span>
          </div>
        </div>
      </div>
    </div>
  );
}
