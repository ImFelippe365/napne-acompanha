import { Spinner } from "flowbite-react";
import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="flex flex-row items-center justify-center text-center pt-12">
      <div className="absolute left-0 right-0">
        <Spinner className="!text-light-gray" color={"success"} size={"md"} />
        <span className="text-gray ml-2">{message ?? "Carregando..."}</span>
      </div>
    </div>
  );
};

export default Loading;
