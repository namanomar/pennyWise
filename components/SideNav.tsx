"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import dotenv from 'dotenv'; 
dotenv.config();
import logo from "../public/logo.png";
import {
  LayoutGrid,
  LucideProps,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SideNav = () => {
  type menuList = {
    id: number;
    name: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    path: string;
  };
  const menuList: menuList[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    
  ];
  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={logo} alt="" width={160} height={100} />
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-blue-700 hover:bg-blue-100 ${
                path == menu.path && "text-blue-700 bg-blue-200"
              }`}
            >
              <menu.icon></menu.icon>
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex gap-2 items-center ">
        <UserButton></UserButton>
        Profile
      </div>
    </div>
  );
};

export default SideNav;
