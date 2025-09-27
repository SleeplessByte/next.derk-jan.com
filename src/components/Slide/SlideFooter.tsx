export type SlideFooterProps = {
  next?: string | React.ReactNode;
  nextAnchor?: string;
  nextCount: number;
  nextLabel: string;
};

export function SlideFooter({
  next,
  nextAnchor,
  nextCount,
  nextLabel,
}: SlideFooterProps) {
  return (
    <footer className="md:absolute left-0 bottom-0 w-full flex items-center">
      {typeof next === "string" ? (
        <a
          href={next}
          className="mx-auto prose-lg p-4 transition rounded-md focus:outline-none focus:ring-2 focus:ring-current mb-2 group"
          rel="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 motion-safe:group-focus:animate-bounceb motion-safe:group-hover:animate-bounceb relative top-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">
            Goto slide {nextCount}: {nextLabel}
          </span>
        </a>
      ) : next === null ? null : (
        next
      )}

      {typeof nextAnchor === "string" ? (
        <a
          href={`#${nextAnchor}`}
          className="mx-auto prose-lg p-4 transition rounded-md focus:outline-none focus:ring-2 focus:ring-current mb-2 group"
          rel="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 motion-safe:group-focus:animate-bounceb motion-safe:group-hover:animate-bounceb relative top-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">
            Goto slide {nextCount}: {nextLabel}
          </span>
        </a>
      ) : null}
    </footer>
  );
}
