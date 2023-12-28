import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDatetime = (datetime: string, includeTime: boolean = false) => {
  if (includeTime) {
    return format(datetime, "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  } else {
    return format(datetime, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  }
};

export const formatDatetimeToInput = (datetime: string) => {
  const formatedDatetime = format(datetime, "yyyy-MM-d'T'HH:mm", { locale: ptBR });
  return formatedDatetime;
};