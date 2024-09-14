"use client";
import BarChartDashboard from "@/components/BarChart";
import CardInfo from "@/components/CardInfo";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BudgetItem from "@/components/BudgetItem";
import ExpenseListTable from "@/components/ExpenseListTable";

const page = () => {
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
  const [expensesList, setExpensesList] = useState([]);
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
  useEffect(() => {
    if (budgetList?.length > 0) {
      GetAllExpenses();
    }
  }, [budgetList]);
  const GetAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };
  return (
    <div className='p-5'>
  <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2> 
  <p className='text-gray-500'>Here&apos;s what happening with your money. Let&apos;s manage your expenses.</p>
  
  <CardInfo />
  
  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-5'>
    {/* Bar Chart Section */}
    <div className='md:col-span-2 lg:col-span-3'>
      <BarChartDashboard />
    </div>

    {/* Latest Budget Section */}
    <div className='grid gap-3'>
      <h2 className='font-bold text-lg'>Latest Budget</h2>
      {budgetList.slice(0, 2).map((budget, index) => (
  <div key={index}>
    <BudgetItem budget={budget} />
  </div>
))}
    </div>

    {/* Expense List Section */}
    <div className='md:col-span-3 lg:col-span-4'>
    <h2 className='font-bold text-lg'>Latest Expenses</h2>
      <ExpenseListTable
        expenseList={expensesList}
        refreshData={() => getBudgetList()}
      />
    </div>
  </div>
</div>

  );
};

export default page;
