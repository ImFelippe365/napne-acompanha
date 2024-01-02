export const formatDatetime = (datetime: string, includeTime: boolean = false) => {
  const formattedDatetime = new Date(datetime);
  if (!includeTime) {
    return (
      formattedDatetime.toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }))
  }
  return (
    formattedDatetime.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    " às " +
    formattedDatetime.toLocaleTimeString("pt-br", { timeStyle: "short" })
  );
};

export const formatDatetimeToInput = (datetime: string) => {
  if (!datetime) return datetime;
  const formattedDatetime = new Date(datetime);
  console.log(formatDatetime)

  return (`${formattedDatetime.getUTCFullYear}-${formattedDatetime.getMonth}-${formattedDatetime.getUTCDay}T${formattedDatetime.getUTCHours}:${formattedDatetime.getUTCMinutes}`)
};

export const formatForBrazilDateStandard = (datetime?: string) => {
  if (datetime) {
    const date = datetime.substring(0, 10)
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)
    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
  }
};