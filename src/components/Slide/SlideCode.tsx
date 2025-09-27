import { useEffect, useMemo, useRef, useState } from "react";

import { codeToHtml } from "shiki";
import { Code as C } from "astro:components";

export function Code({
  language,
  children,
  caption,
}: {
  language: string;
  children: string;
  caption: string;
}) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const [code, setCode] = useState("");

  useEffect(() => {
    /*
    return hljs.highlight(children.trim(), {
      language: language,
    }).value;*/

    let isMounted = true;

    new Promise<string>(async (resolve) => {
      const html = await codeToHtml(children.trim(), {
        lang: language,
        theme: "github-dark",
      });

      resolve(html);
    }).then((html) => {
      if (isMounted) {
        setCode(html);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [children, language]);

  useEffect(() => {
    if (!preRef.current) {
      return;
    }

    let raf: undefined | number;

    function resized() {
      raf = undefined;

      if (preRef.current) {
        setHasOverflow(
          preRef.current.scrollHeight !== preRef.current.clientHeight,
        );
      }
    }

    function onResize() {
      if (raf) {
        return;
      }

      raf = requestAnimationFrame(resized);
    }

    setHasOverflow(preRef.current.scrollHeight !== preRef.current.clientHeight);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [preRef]);

  return (
    <figure className="max-w-full w-auto max-h-full prose-2xl">
      <figcaption
        className="font-semibold"
        style={{ marginTop: 0, marginBottom: "-2rem" }}
      >
        {caption}
      </figcaption>
      <pre
        className="border dark:border-0 bg-zinc-900 text-zinc-50 dark:bg-black/30 shadow-sm leading-6 sm:leading-6 md:leading-7 overflow-auto max-w-full max-h-[80%]"
        tabIndex={hasOverflow ? 0 : undefined}
        ref={preRef}
      >
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    </figure>
  );
}
