import { useMemo } from "react";

export default function TimeToRead({ minutes }: { minutes: number }) {
  const indicator = useMemo(() => {
    const cups = Math.round(minutes / 5);
    if (cups > 5) {
      return `${new Array(Math.round(cups / Math.E)).fill("🍱").join("")}`;
    }

    return `${new Array(cups || 1).fill("☕️").join("")}`;
  }, [minutes]);

  return (
    <span>
      <span aria-hidden="true">{indicator}</span> {Math.round(minutes)} min read
    </span>
  );
}
