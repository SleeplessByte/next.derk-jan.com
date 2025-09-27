import React from "react";

export function ExternalLink({
  href,
  children,
  label,
  target,
  inline,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string;
  children: React.ReactNode;
  label?: string;
  target?: string;
  inline?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${
        inline ? "inline-flex" : "flex"
      } items-baseline py-1 px-4 -mx-4 focus:outline-none focus:ring-2 focus:ring-current transition rounded-sm`}
      aria-label={label}
      target={target}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 align-middle relative -left-1 top-1 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
        <title>External: </title>
      </svg>
      <span>{children}</span>
    </a>
  );
}
