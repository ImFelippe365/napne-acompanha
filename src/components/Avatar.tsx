import { useState } from "react";
import { BiUser } from "react-icons/bi";

interface AvatarProps {
  image?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  onBlur?: () => void;
}

const Avatar = ({ image, size = 40, className, onClick, onBlur }: AvatarProps) => {
  const [showDefaultImage, setShowDefaultImage] = useState(false);
  if (!image || showDefaultImage)
    return (
      <div
        className={`flex items-center justify-center bg-primary-transparent p-2 rounded-full w-[${size}px] h-[${size}px]`}
      >
        <BiUser size={size / 2} className={`text-xl text-primary`} />
      </div>
    );

  return (
    <button className={`${!onClick ? "cursor-default" : ""}`} onClick={onClick} onBlur={onBlur}>
      <img
        className={`rounded-full object-cover w-[${size}px] h-[${size}px] ${
          className ?? ""
        }`}
        src={image}
        onError={() => setShowDefaultImage(true)}
      />
    </button>
  );
};

export default Avatar;
