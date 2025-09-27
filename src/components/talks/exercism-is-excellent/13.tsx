import { motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import communitySrc from "/src/assets/talks/exercism-is-excellent/community.png";

const NEXT_SLIDE_COUNT = 14;
const NEXT_SLIDE_LABEL = "12 in 23";
const NEXT_TIMEOUT = 45 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/14";

export default function Page() {
  return (
    <div>
      <header className="pb-0">
        <h2 className="font-semibold flex" style={{ marginTop: 0 }}>
          <span className="sr-only">Slide 13:</span>Community
        </h2>
      </header>

      <div className="flex flex-col max-h-[80vh] mx-auto max-w-4xl">
        <div className="relative col-span-1 max-w-full rounded-lg border-black/20 dark:border-black border-4 shadow-xl overflow-hidden bg-white">
          <motion.img
            initial={{
              transform: "scale(1.15, 1.15) translate(0, 0)",
            }}
            animate={{
              transform: [
                "scale(1.15, 1.15) translate(0, 0)",
                "scale(1.5, 1.5) translate(10%, -12.5%)",
              ],
              transition: {
                duration: ((NEXT_TIMEOUT / 3) * 2.5) / 1000,
                ease: "easeInOut",
              },
            }}
            width={3246}
            height={2084}
            src={communitySrc.src}
            alt=""
            className='overflow-hidden max-w-full block  relative origin-left"'
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
