import { Spinner } from "flowbite-react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center text-center pt-12">
      <div className="absolute left-0 right-0">
        <Spinner className="!text-light-gray" color={"success"} size={"md"} />
        <span className="text-gray ml-2">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
