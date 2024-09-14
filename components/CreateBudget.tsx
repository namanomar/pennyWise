"use client";
import React, { useState } from "react";
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
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = ({refreshData}) => {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [Budget, setBudget] = useState({
    emoji: emojiIcon,
    budgetName: "",
    amount: 0,
  });

  const { user } = useUser();
  const handleSubmit = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: Budget.budgetName,
        amount: Budget.amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: Budget.emoji,
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      refreshData();
      toast("Budget has been added.");
    } else {
      toast("Budget has not been added.Error Occurred");
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <div className="bg-slate-100  rounded-lg p-10 items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md ">
            <h2 className="text-3xl">+</h2>
            <h2>Create new Budgets</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                size="lg"
                className="text-lg"
                onClick={() => setOpenEmojiPicker((e) => !e)}
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setBudget((prevprops) => ({
                      ...prevprops,
                      emoji: e.emoji ,
                    }));
                  }}
                ></EmojiPicker>
              </div>
              <div className="mt-5">
                <h2 className="text-black  my-1 font-semibold">Budget name</h2>
                <Input
                  placeholder="e.g. Home Decor"
                  onChange={(e) =>
                    setBudget((prevprops) => ({
                      ...prevprops,
                      budgetName: e.target.value,
                    }))
                  }
                ></Input>
              </div>
              <div className="mt-2">
                <h2 className="text-black  my-1 font-semibold">
                  Budget Amount
                </h2>
                <Input
                  placeholder="e.g. 5000"
                  type="number"
                  onChange={(e) =>
                    setBudget((prevprops) => ({
                      ...prevprops,
                      amount: parseInt(e.target.value),
                    }))
                  }
                ></Input>
              </div>

              {/* <EmojiPicker /> */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex items-center w-full gap-2">
                  <Button
                    disabled={!(Budget.budgetName && Budget.amount)}
                    className="w-full bg-blue-600"
                    variant="secondary"
                    onClick={handleSubmit}
                  >
                    Create Budget
                  </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
