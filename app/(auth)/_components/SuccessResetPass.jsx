import React from "react";

const SuccessResetPass = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="size-[70%] min-w-[300px] min-h-[300px] md:min-w-[500px] md:min-h-[500px] overflow-hidden">
        <img
          src="/images/resetpass.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl lg:text-3xl font-medium text-center">
        "Your password has been reset successfully! You’re good to go."
      </h2>
    </div>
  );
};

export default SuccessResetPass;
