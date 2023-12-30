import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDatetime = (datetime: string, includeTime: boolean = false) => {
  console.log(datetime)
  if (includeTime) {
    return format(datetime, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  } else {
    return format(datetime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }
};

export const formatDatetimeToInput = (datetime: string) => {
  console.log(datetime)
  const formatedDatetime = format(datetime, "yyyy-MM-d'T'HH:mm", { locale: ptBR });
  return formatedDatetime;
};

export const formatForBrazilDateStandard = (datetime?: string) => {
  if (datetime) {
    const teste = datetime.substring(0, 10)
    const year = teste.slice(0, 4)
    const month = teste.slice(5, 7)
    const day = teste.slice(8, 10)
    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
  }
};