import { Department } from "../interfaces/User";


export const formatUserDepartment = (department: Department) => {
  if (!department) return department;
  switch (department) {
    case "ADMINISTRATOR":
      return "Administrador";
    case "TEACHER":
      return "Professor(a)";
    default:
      break;
  }
};
