import { useEffect, useRef, useState } from "react";
import { SlideFooter, type SlideFooterProps } from "./SlideFooter";

export function AutoSlideFooter({
  next,
  ...props
}: SlideFooterProps & { duration: number }) {
  return <SlideFooter {...props} next={<AutoNext next={next} {...props} />} />;
}

function AutoNext({
  next,
  nextCount,
  nextLabel,
  duration,
}: SlideFooterProps & { duration: number }) {
  const progressBar = useRef<HTMLDivElement | null>(null);
  const [animateClassName, setAnimateClassName] = useState("");
  const refLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const elem = progressBar.current;

    if (!elem) {
      return;
    }

    elem.style.transitionDuration = "0ms";
    elem.style.transform = "scaleY(0.0001)";
    elem.getBoundingClientRect();

    let timer = requestAnimationFrame(() => {
      elem.style.transitionDuration = `${duration}ms`;
      elem.getBoundingClientRect();

      timer = requestAnimationFrame(() => {
        elem.style.transform = "scaleY(1)";
        elem.getBoundingClientRect();
      });
    });

    let timeout = setTimeout(() => {
      setAnimateClassName("motion-safe:animate-bounceb");

      timeout = setTimeout(() => {
        setAnimateClassName("");
        refLink.current?.click();
      }, 5000);
    }, duration - 5000);

    return () => {
      cancelAnimationFrame(timer);
      clearTimeout(timeout);
    };
  }, [next, duration, refLink]);

  return (
    <a
      ref={refLink}
      href={typeof next === "string" ? next : "#"}
      className="mx-auto prose-lg transition rounded-md focus:outline-none focus:ring-2 focus:ring-current mb-2 group shadow-sm"
      rel="next"
    >
      <div className="p-4 rounded-md w-full h-full relative shadow-inner bg-gray-100  dark:bg-black/50">
        <div className="absolute bottom-0 left-0 rounded-md h-full w-full overflow-hidden">
          <div
            ref={progressBar}
            className="h-full w-full bg-pink-100 dark:bg-pink-900 dark:shadow-inner"
            style={{
              transitionTimingFunction: "ease",
              transitionDuration: "0ms",
              transitionProperty: "transform",
              transformOrigin: "bottom",
            }}
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 motion-safe:group-focus:animate-bounceb motion-safe:group-hover:animate-bounceb relative top-1 ${animateClassName}`}
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
      </div>
    </a>
  );
}
