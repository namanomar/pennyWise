"use client"
import Image from "next/image";
import React from "react";
import dashboard from "../public/dashboard.png";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-50 flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
          <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
              <strong className="font-extrabold">
                {" "}
                PennyWise{" "}
              </strong>
            </h1>
            <TypeAnimation
              sequence={[
                "Manage Expenses",
                1000,
                "Enhance LongTime Growth",
                1000,
              ]}
              wrapper="span"
              speed={10}
              className="text-3xl font-extrabold sm:text-5xl  text-red-700 sm:block"
              repeat={Infinity}
            />
            

            <p className="mt-4 sm:text-xl/relaxed">
              Take Control of Your Finances: Simplify Budgeting, Maximize
              Savings, and Achieve Your Financial Goals!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-slate-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/sign-in"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={dashboard}
            alt=""
            width={1000}
            height={700}
            className="mt-5 rounded-xl border-2 "
          ></Image>
        </div>
      </section>
    </div>
  );
};

export default Hero;
