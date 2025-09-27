import { motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import representerResultSrc from "/src/assets/talks/exercism-is-excellent/representer.jpg";
import representerResultSrc2 from "/src/assets/talks/exercism-is-excellent/representer2.jpg";

const NEXT_SLIDE_COUNT = 12;
const NEXT_SLIDE_LABEL = "Human feedback";
const NEXT_TIMEOUT = 15 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/12";

export default function Page() {
  return (
    <div>
      <header className="sr-only">
        <h2>Slide 11: Semi-automated feedback</h2>
      </header>

      <div className="flex flex-col max-h-[80vh] mx-auto max-w-4xl">
        <div className="relative col-span-1 max-w-full">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2 } }}
            src={representerResultSrc.src}
            alt=""
            className='overflow-hidden max-w-full block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"'
          />
        </div>

        <div className="relative col-span-1 max-w-full max-h-[70vh]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 8 } }}
            src={representerResultSrc2.src}
            alt=""
            className='overflow-hidden max-w-full block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"'
          />
        </div>
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
