import React from "react";
import Heading from "../components/Heading";
import SettingsTabs from "../components/SettingsTabs";
import { Outlet } from "react-router-dom";

const AcademicManagement: React.FC = () => {

  return (
    <>
      <Heading
        title="Gestão acadêmica"
      />

      <SettingsTabs />
      
      <Outlet />
    </>
  );
};

export default AcademicManagement;
