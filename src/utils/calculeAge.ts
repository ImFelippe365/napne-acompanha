import { differenceInYears } from "date-fns";

export const calculeAge = (dateOfBirth: string | undefined) => {
  if (!dateOfBirth) return;
  return differenceInYears(new Date(), new Date(dateOfBirth));
};
