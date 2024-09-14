
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="">
      <div >{children}</div>
    </div>
  );
};

export default layout;
