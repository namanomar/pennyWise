import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { sql, eq } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm/utils";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = () => {
  const loadingArray: number[] = [1, 2, 3];
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

  const [totalBudget, setTotalBuget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

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

  // Trigger calculateCardInfo when budgetList is updated
  useEffect(() => {
    if (budgetList.length > 0) {
      calculateCardInfo();
    }
  }, [budgetList]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += Number(element.totalSpend);
    });
    setTotalBuget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length>0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7  border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-boold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white"></PiggyBank>
          </div>
          <div className="p-7  border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-boold text-2xl">${totalSpend}</h2>
            </div>
            <ReceiptText className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white"></ReceiptText>
          </div>
          <div className="p-7  border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Number of Budget</h2>
              <h2 className="font-boold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white"></Wallet>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loadingArray.map((item, index) => (
            <div key={index} className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg ">
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
