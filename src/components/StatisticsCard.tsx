import React from "react";

interface StatisticsCardProps {
  title: string;
  numbers: number;
  icon: React.ReactNode;
}

const StatisticsCard = ({ title, numbers, icon }: StatisticsCardProps) => {
  return (
    <div className="p-4 bg-primary-transparent w-1/5 rounded-lg flex flex-col gap-4">
      <div className="text-gray flex items-center justify-between">
        <p>{title}</p>
        {icon}
      </div>
      <p className="font-semibold text-3xl">{numbers}</p>
    </div>
  );
};

export default StatisticsCard;
