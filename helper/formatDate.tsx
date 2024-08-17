export default function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate.replace(",", "");
}
