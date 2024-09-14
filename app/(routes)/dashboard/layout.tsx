"use client";
import DashboardHeader from "@/components/DashboardHeader";
import SideNav from "@/components/SideNav";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user } = useUser();
  const router = useRouter();
  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result && Array.isArray(result) && result.length === 0) {
      router.refresh();
    }
  };

  useEffect(() => {
      checkUserBudgets();
  }, [user]);
  return (
    <div className="">
      <div className="fixed md:w-64 hidden md:block">
        <SideNav></SideNav>
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader></DashboardHeader>
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardLayout;
