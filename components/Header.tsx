"use client"
import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import { Button, buttonVariants } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="pt-5  px-5 pb-5 flex justify-between  shadow-sm">
      <Image src={logo} alt="" width={80} height={50}></Image>
      {isSignedIn ? (
        <UserButton></UserButton>
      ) : (
        <Link href="/sign-in"><Button className={buttonVariants({ variant: "secondary" })}>Get Started</Button></Link>
      )}
    </div>
  );
};

export default Header;
