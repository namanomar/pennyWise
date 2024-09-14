import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { sql, eq } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm/utils";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Rectangle,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartDashboard = () => {
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
    if (user) {
      getBudgetList();
    }
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
    <div className="border rounded-lg p-5 ">
        <h2 className="font-bold text-lg pb-3"> Activity</h2>
        <ResponsiveContainer width={"80%"} height={300}>
      <BarChart
        data={budgetList}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#4845D2" stackId='a'/>
        <Bar dataKey="totalSpend" fill="#8884d8" stackId='a'/>
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
