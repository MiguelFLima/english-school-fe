export const getBeutyDate = (date: string) => {
  const data = new Date(date);
  return `${data.getFullYear()} - ${checkMonth(
    data.getMonth() + 1
  )} - ${checkMonth(data.getDate())}`;
};

const checkMonth = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};
