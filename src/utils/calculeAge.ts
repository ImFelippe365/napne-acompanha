import { differenceInYears } from "date-fns"

export const calculeAge = (dateOfBirth: string) => {
  return differenceInYears(new Date(), new Date(dateOfBirth))
}