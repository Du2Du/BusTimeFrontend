export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const day = newDate.getDate();
  const month = String(newDate.getMonth() + 1);

  return `${day}/${month}/${year}`
};

export const formatDateWithHour = (date: Date) => {
  const newDate = new Date(date);
  
  const year = newDate.getFullYear();
  const day = newDate.getDate();
  const month = String(newDate.getMonth() + 1);

  const hour = newDate.toLocaleTimeString();

  return `${day}/${month}/${year} ${hour}`;
};