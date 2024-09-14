import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

const EditBudget = ({ getbudgetInfo ,refreshData ,id}) => {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetInfo, setBudgetInfo] = useState();
  const [Budget, setBudget] = useState({
    emoji: emojiIcon,
    budgetName: "",
    amount: 0,
  });

  useEffect(() => {
    user && handleGetBudgetInfo();
  }, []);

  const { user } = useUser();

  const handleEditButton = async() => {
    const result=await db.update(Budgets).set({
      name:Budget.budgetName,
      amount:Budget.amount,
      icon:Budget.emoji
    }).where(eq(Budgets.id,id)).returning()
    if(result){
      toast('Budget got Updated')
      refreshData()
    }
    // Handle edit logic here
  };

  const handleGetBudgetInfo = async () => {
    const result = await getbudgetInfo();
    setBudgetInfo(result);
    setBudget({
      emoji: result?.icon || emojiIcon,
      budgetName: result?.name || "",
      amount: parseInt(result?.amount) || 0,
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex text-sm font-medium items-center text-white bg-black rounded-md px-5 py-2 hover:bg-slate-600">
            <PenBox /> Edit
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="relative">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker((prev) => !prev)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setBudget((prevprops) => ({
                          ...prevprops,
                          emoji: e.emoji,
                        }));
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h2 className="text-black my-1 font-semibold">Budget name</h2>
                <Input
                  placeholder="e.g. Home Decor"
                  defaultValue={budgetInfo?.name || ""}
                  onChange={(e) =>
                    setBudget((prevprops) => ({
                      ...prevprops,
                      budgetName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black my-1 font-semibold">Budget Amount</h2>
                <Input
                  placeholder="e.g. 5000"
                  type="number"
                  defaultValue={Budget?.amount || 0}
                  onChange={(e) =>
                    setBudget((prevprops) => ({
                      ...prevprops,
                      amount: isNaN(parseInt(e.target.value))
                        ? 0
                        : parseInt(e.target.value),
                    }))
                  }
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex items-center w-full gap-2">
                <Button
                  disabled={!(Budget.budgetName && Budget.amount > 0)}
                  className="w-full bg-blue-600"
                  variant="secondary"
                  onClick={handleEditButton}
                >
                  Update Budget
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
