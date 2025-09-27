import { motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import mentoringSrc from "/src/assets/talks/exercism-is-excellent/mentoring.png";

const NEXT_SLIDE_COUNT = 13;
const NEXT_SLIDE_LABEL = "Community";
const NEXT_TIMEOUT = 45 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/13";

export default function Page() {
  return (
    <div>
      <header className="pb-0">
        <h2 className="font-semibold flex" style={{ marginTop: 0 }}>
          <span className="sr-only">Slide 12:</span>Human feedback
        </h2>
      </header>

      <div className="flex flex-col max-h-[80vh] mx-auto max-w-4xl">
        <div className="relative col-span-1 max-w-full">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2 } }}
            src={mentoringSrc.src}
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
