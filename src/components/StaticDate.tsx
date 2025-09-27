import { useMemo } from "react";

export default function StaticDate({
  date,
  "aria-label": label,
}: {
  date: string | Date | number;
  "aria-label": string;
}) {
  const time = useMemo(() => {
    if (typeof date === "string" || typeof date === "number") {
      return new Date(date);
    }

    return date;
  }, [date]);

  return (
    <time
      dateTime={time.toISOString().split("T").shift()}
      suppressHydrationWarning
    >
      <span className="sr-only">{label}</span>
      {time.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}
