export const formatNoteDate = (date: string) => {
  if (!date) return date;
  const formattedDate = new Date(date);
  return (
    formattedDate.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
    }) +
    " às " +
    formattedDate.toLocaleTimeString("pt-br", { timeStyle: "short" })
  );
};
