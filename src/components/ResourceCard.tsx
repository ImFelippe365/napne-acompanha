import { Spinner } from "flowbite-react";

interface ResourceCardProps {
  title: string;
  count: number;
  isLoading?: boolean;
}

const ResourceCard = ({ title, count, isLoading }: ResourceCardProps) => {
  return (
    <div className="bg-background-color p-4 pr-16 gap-2 rounded-lg">
      <label className="text-xs">{title}</label>
      <p className="text-black font-bold text-4xl mt-2">
        {isLoading ? (
          <Spinner color={"success"} className="text-light-gray" />
        ) : (
          count
        )}
      </p>
    </div>
  );
};

export default ResourceCard;
