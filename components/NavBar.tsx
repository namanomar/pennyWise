"use client";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Corrected import
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div>
      <DestopNavbar />
    </div>
  );
};

type ItemType = {
  label: string;
  link: string;
};

const items: ItemType[] = [
  { label: "Dashboard", link: "/" },
  { label: "Transaction", link: "/transactions" }, // Corrected "transctions" typo
  { label: "Manage", link: "/manage" },
];

function DestopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item, index) => (
              <NavbarItem key={index} link={item.link} label={item.label} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className={cn(buttonVariants({variant:"destructive"}))}>csv</button>
            <UserButton afterSwitchSessionUrl="/signin"></UserButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ link, label }: ItemType) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-pretty hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></div>
      )}
    </div>
  );
}

export default NavBar;
