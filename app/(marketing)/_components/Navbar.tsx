"use client";
import useScollTop from "@/hooks/useScollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = (): JSX.Element => {
  const scroll = useScollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle/>
      </div>
    </div>
  );
};

export default Navbar;
