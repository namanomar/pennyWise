import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expenseList ,refreshData}) => {

  const deleteExpense=async(element)=>{
    const result=await db.delete(Expenses).where(eq(Expenses.id,element.id)).returning();
    if(result){
      toast('Expenses Deleted Successfully')
    }else{
      toast('Deletion failed!')
    }
    refreshData()

  }
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((element, index) => {
        return (
          <div className="grid grid-cols-4 bg-slate-100 p-2" key={index}>
            <h2>{element.name}</h2>
            <h2>{element.amount}</h2>
            <h2>{element.createdAt}</h2>
            <div className="flex  items-center">
              <Trash className="text-red-600 cursor-pointer" onClick={()=>{deleteExpense(element);}} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseListTable;
