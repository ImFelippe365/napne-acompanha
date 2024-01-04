import React, { useState } from "react";
import Avatar from "./Avatar";
import { useAuth } from "../hooks/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserTooltip: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Avatar
        onClick={() => setShowTooltip((show) => !show)}
        onBlur={() => setShowTooltip(false)}
        image={`${process.env.VITE_SUAP_URL}${user?.picture}`}
        size={40}
        className="w-[40px] h-[40px]"
      />
      {showTooltip && (
        <div className="">
          <ul className="w-48 absolute right-48 top-14 bg-white shadow-lg rounded-md">
            <li className="w-full px-4 py-2 border-b-[1px] border-light-gray">
              <p className="text-gray text-xs">Você está logado como:</p>
              <span className="text-black font-semibold text-base">
                {user?.name}
              </span>
            </li>
            <li
              onClick={() => {
                logout();
                navigate("entrar");
              }}
              className="w-full px-4 py-3 flex items-center gap-2 cursor-pointer"
            >
              <FiLogOut className="text-error text-lg" />
              <span className="text-error font-semibold text-sm">Sair</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserTooltip;
