import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type DOMAttributes,
} from "react";

type OnMouseUp = DOMAttributes<HTMLDivElement>["onMouseUp"];
type OnMouseUpParameters = Parameters<NonNullable<OnMouseUp>>;

export function AccessibleCardLink({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const clickTimeRef = useRef(0);
  const onMouseUpRef = useRef<OnMouseUp>(undefined);

  const onMouseDown = useCallback(() => {
    clickTimeRef.current = new Date().getTime();
  }, []);

  const [, forceRerender] = useReducer((prev) => prev + 1, 0);

  useEffect(() => {
    onMouseUpRef.current = (e: OnMouseUpParameters[0]) => {
      // Ignore because this is on the link
      if (e.target instanceof HTMLElement) {
        if (e.target.closest("a")) {
          return;
        }
      }

      // Click the link
      if (new Date().getTime() - clickTimeRef.current < 350) {
        e.currentTarget.querySelector("a")?.click();
      }
    };

    forceRerender();
  }, []);

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUpRef.current}
    >
      {children}
    </div>
  );
}

AccessibleCardLink.Extension = function Extension({
  className,
}: {
  className: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(true);
  }, []);

  return <span className={className} aria-hidden="true" hidden={hidden} />;
};
