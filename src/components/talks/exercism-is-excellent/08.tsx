import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import elixirSrc from "/src/assets/talks/exercism-is-excellent/concepts-elixir.png";

const NEXT_SLIDE_COUNT = 9;
const NEXT_SLIDE_LABEL = "Feedback: analyzer";
const NEXT_TIMEOUT = 35 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/09";

export default function Page() {
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = progressBar.current;

    if (!elem) {
      return;
    }

    elem.style.transitionDuration = "0ms";
    elem.style.width = "0%";
    elem.getBoundingClientRect();

    let timer = requestAnimationFrame(() => {
      elem.style.transitionDuration = `${NEXT_TIMEOUT}ms`;
      elem.getBoundingClientRect();

      timer = requestAnimationFrame(() => {
        elem.style.width = "100%";
        elem.getBoundingClientRect();
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);

  return (
    <div>
      <header className="pb-0">
        <h2 className="font-semibold flex" style={{ marginTop: 0 }}>
          <span className="sr-only">Slide 8: about the</span>
          Syllabus
        </h2>
      </header>
      <div className="w-[270px] h-[270px] md:w-[540px] md:h-[540px] mx-auto sm:mx-0">
        <AnimatePresence mode="popLayout">
          <motion.figure
            key={elixirSrc.src}
            className="overflow-hidden max-h-full block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"
            style={{ margin: 0 }}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, overflow: {} }}
          >
            <motion.img
              initial={{
                transform: "scale(1.0, 1.0) translate(0, 0)",
              }}
              animate={{
                transform: [
                  "scale(1.0, 1.0) translate(0, 0)",
                  "scale(1.2, 1.2) translate(0, -33%)",
                  "scale(1.0, 1.0) translate(0, -66%)",
                ],
                transition: {
                  delay: 3,
                  duration: ((NEXT_TIMEOUT / 3) * 2.5) / 1000,
                  ease: "easeInOut",
                },
              }}
              src={elixirSrc.src}
              width={2880}
              height={8312}
              className="w-[270px] h-[779px] md:w-[540px] md:h-[1558px] origin-top"
              alt=""
            />
            <div
              ref={progressBar}
              className={"absolute top-0 h-1 bg-yellow-600"}
              style={{
                transitionProperty: "width",
                transitionDuration: "0ms",
                transitionTimingFunction: "ease-in-out",
              }}
            />
          </motion.figure>
        </AnimatePresence>
      </div>
      <AutoSlideFooter
        next={NEXT_SLIDE}
        nextCount={NEXT_SLIDE_COUNT}
        nextLabel={NEXT_SLIDE_LABEL}
        duration={NEXT_TIMEOUT}
      />
    </div>
  );
}
