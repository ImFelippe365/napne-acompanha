import { Shift } from "../interfaces/Class";

export const formatShift = (shift: Shift) => {
  if (!shift) return shift;
  switch (shift) {
    case "AFTERNOON":
      return "Tarde";
    case "MORNING":
      return "Manhã";
    case "NIGHT":
      return "Noite";
    default:
      break;
  }
};
