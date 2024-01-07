export const FormatDate = (dateString) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
