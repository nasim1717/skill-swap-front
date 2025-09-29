import LogoIcon from "../assets/icon.png";
export default function Logo() {
  return (
    <div className="flex items-center ">
      <img src={LogoIcon} alt="" className="w-[6rem] pt-3" />
      <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        SkillSwap
      </span>
    </div>
  );
}
