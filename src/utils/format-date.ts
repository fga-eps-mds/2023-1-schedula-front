export type dateFormats = 'date' | 'time';

export const formatDate = (
  date: Date | number | string,
  format: dateFormats = 'date',
  locale = 'pt-BR'
): string => {
  const formatMap: Record<dateFormats, Intl.DateTimeFormatOptions> = {
    date: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  };

  try {
    const localDate = new Date(date);

    const timezoneOffset = localDate.getTimezoneOffset();
    const timezoneOffsetHours = timezoneOffset / 60;
    localDate.setHours(localDate.getHours());

    const formatedDate = new Intl.DateTimeFormat(
      locale,
      formatMap[format] as Intl.DateTimeFormatOptions
    ).format(localDate);

    return formatedDate;
  } catch (error) {
    return '--/--/----';
  }
};

export function parseSelectedDate(value: string) {
  const date = new Date(value);

  const timezoneOffset = date.getTimezoneOffset();
  date.setHours(date.getHours());

  const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();

  return String(`${year}-${month}-${day}`);
}

export function parseSelectedDatetime(value: string) {
  const date = new Date(value);

  const timezoneOffset = date.getTimezoneOffset();
  date.setHours(date.getHours());

  const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return String(
    `${year}-${month}-${day}T${hour < 10 ? `0${hour}` : hour}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`
  );
}
