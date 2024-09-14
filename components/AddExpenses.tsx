import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner";
import moment from 'moment'

const AddExpenses = ({ budgetId ,user ,refreshData}) => {
  const [expenses, setExpenses] = useState({
    name: "",
    amount: 0
  });

  const handleSubmit = async () => {
    try {
      const result = await db.insert(Expenses).values({
        name: expenses.name,
        amount: expenses.amount,
        budgetId: budgetId,
        createdAt:moment().format('DD/MM/yyy')
      }).returning({ insertedId: Budgets.id });

      console.log(result);
      if (result) {
        toast.success("Expense added successfully.");
        refreshData();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="border p-5 rounded">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-5">
        <h2 className="text-black my-1 font-semibold">Expense Name</h2>
        <Input
          placeholder="e.g. Party"
          value={expenses.name}
          onChange={(e) =>
            setExpenses((prevProps) => ({
              ...prevProps,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black my-1 font-semibold">Expense Amount</h2>
        <Input
          placeholder="e.g. 5000"
          type="number"
          value={expenses.amount}
          onChange={(e) =>
            setExpenses((prevProps) => ({
              ...prevProps,
              amount: parseFloat(e.target.value) || 0,
            }))
          }
        />
        <Button
          disabled={!(expenses.amount > 0 && expenses.name)}
          variant="secondary"
          className="mt-3 w-full"
          onClick={handleSubmit}
        >
          Add New Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpenses;
