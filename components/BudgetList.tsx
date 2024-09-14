"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const loadingArray :number[]= [1, 2, 3, 4, 5, 6];
  const { user } = useUser();
  interface BudgetItemProps {
    amount: string;
    createdBy: string;
    icon: string;
    id: number;
    name: string;
    totalItems: number;
    totalSpend: number;
  }
  const [budgetList, setBudgetList] = useState<BudgetItemProps[]>([]);

  useEffect(() => {
    user && getBudgetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  /**
   * Used to get Budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);
    setBudgetList(result as BudgetItemProps[]);
  };

  return (
    <div className="mt-7">
      <CreateBudget
        refreshData={() => {
          getBudgetList();
        }}
      ></CreateBudget>
      <br></br>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {budgetList.length > 0 ? 
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))
         :loadingArray.map((item, index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))
        }
      </div>
    </div>
  );
};

export default BudgetList;
