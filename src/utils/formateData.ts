export const formatDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  const date = new Date(timestamp.seconds * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
