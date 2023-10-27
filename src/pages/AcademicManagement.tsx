import React from "react";
import Heading from "../components/Heading";
import SettingsTabs from "../components/SettingsTabs";

const AcademicManagement: React.FC = () => {
  return (
    <>
      <Heading
        title="Gestão acadêmica"
      />

      <SettingsTabs />
    </>
  );
};

export default AcademicManagement;
