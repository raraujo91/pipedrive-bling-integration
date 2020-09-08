function convertDate(date: string): string {
  const parsedDate = date.slice(0, 10).split('-');
  const [year, month, day] = parsedDate;
  return `${day}/${month}/${year}`;
}

export default convertDate;
