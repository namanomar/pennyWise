"use client";
import AddExpenses from "@/components/AddExpenses";
import BudgetItem from "@/components/BudgetItem";
import ExpenseListTable from "@/components/ExpenseListTable";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { PenBox, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "@/components/EditBudget";

const Expense = ({ params }: any) => {
  const { user } = useUser();
  const router = useRouter();

  const [expenseList, setExpenseList] = useState<
    {
      id: number;
      name: string;
      amount: number;
      createdBy: string;
      budgetId: number | null;
    }[]
  >([]);
  
  const [budgetInfo, setBudgetInfo] = useState<any>(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user) {
      getBudgetInfo();
      getExpensesList();
    }
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItems: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
    } catch (error) {
      toast.error("Failed to fetch budget information");
    } finally {
      setLoading(false);
    }
  };

  const getExpensesList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));
      setExpenseList(result);
    } catch (error) {
      toast.error("Failed to fetch expenses");
    }
  };

  const deleteExpense = async () => {
    try {
      const deleteExpenseResult = await db
        .delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning();
      if (deleteExpenseResult) {
        const result = await db.delete(Budgets).where(eq(Budgets.id, params.id)).returning();
        if (result) {
          toast.success("Expense deleted successfully");
          router.replace("/dashboard/budgets");
        }
      }
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="p-10">
      <h2 className="flex text-2xl font-bold mb-5 justify-between">
        My Expenses
        <div className="flex gap-2 items-center">
          <EditBudget
            getbudgetInfo={async () => {
              if (user && budgetInfo) {
                return budgetInfo;
              }
            }}
            refreshData={async () => {
              await getBudgetInfo();
              await getExpensesList();
            }}
            id={params.id}
          ></EditBudget>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span className="flex items-center font-bold">
                <Button className="bg-red-500" variant="destructive">
                  <Trash /> Delete
                </Button>
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  expense and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteExpense}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {loading ? (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        ) : (
          budgetInfo && <BudgetItem budget={budgetInfo}></BudgetItem>
        )}
        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={async () => {
            await getBudgetInfo();
            await getExpensesList();
          }}
        ></AddExpenses>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshData={async () => {
            await getBudgetInfo();
            await getExpensesList();
          }}
        ></ExpenseListTable>
      </div>
    </div>
  );
};

export default Expense;
