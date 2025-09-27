import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import testsSrc from "/src/assets/talks/exercism-is-excellent/tests.jpg";

const NEXT_SLIDE_COUNT = 7;
const NEXT_SLIDE_LABEL = "Syllabus";
const NEXT_TIMEOUT = 30 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/07";

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
          <span className="sr-only">Slide 6: about the</span>
          Test runner
        </h2>
      </header>
      <div className="w-[182px] h-[242px] md:w-[455px] md:h-[605px] mx-auto sm:mx-0">
        <AnimatePresence mode="popLayout">
          <motion.figure
            key={testsSrc.src}
            className="overflow-hidden block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"
            style={{ margin: 0 }}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, overflow: {} }}
          >
            <img
              src={testsSrc.src}
              width={819}
              height={1089}
              className="w-[182px] h-[242px] md:w-[455px] md:h-[605px]"
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
            ></div>
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
