import Link from "next/link";
import React from "react";

interface BudgetItemProps {
  amount: string;
  createdBy: string;
  icon: string;
  id: number;
  name: string;
  totalItems: number;
  totalSpend: number;
}

const BudgetItem = ({ budget }) => {

  
  return (
    <Link href={`/dashboard/expenses/${budget.id}`} className="p-5 border rounded-lg gap-2 h-[170px] flex flex-col hover:shadow-md cursor-pointer">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-600">{budget.totalItems} Items</h2>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-violet-600">
            ${budget.amount}
          </h2>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm   text-gray-500">${budget?.totalSpend?budget?.totalSpend:0} Spended</h2>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm  text-gray-500">
            ${budget?.amount - budget?.totalSpend} Remaining
          </h2>
        </div>
      </div>
      <div >
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-violet-600 h-2 rounded-full"
            style={{
              width: `${
                ((budget.amount - budget.totalSpend) / budget.amount) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
