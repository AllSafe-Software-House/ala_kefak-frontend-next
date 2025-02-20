import React from "react";

const SuccessLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="size-[70%] min-w-[300px] min-h-[300px] md:min-w-[500px] md:min-h-[500px] overflow-hidden">
        <img
          src="/images/welcome.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl lg:text-3xl font-medium text-center">
        "Login successful! Welcome aboard!"
      </h2>
    </div>
  );
};

export default SuccessLogin;
